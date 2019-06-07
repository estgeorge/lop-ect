--  UFRGS - II - PPGC - CMP114 - Marcelo Johann - 16/06/2003
--  Didatic Computer Neander - version 0.1 - LDA STA ADD JMP

library IEEE;
use IEEE.std_logic_1164.all;
use IEEE.std_logic_arith.all;
use IEEE.std_logic_unsigned.all;

entity neander01 is
port (
  -- little i/o: only power, clock and reset 
  ck:		in std_logic;
  reset:	in std_logic;
  pc:		out	std_logic_vector(7 downto 0);
  ri:		out	std_logic_vector(7 downto 0);
  estado:	out	std_logic_vector(7 downto 0);
  ac:		out	std_logic_vector(7 downto 0);
  rrdm:		out	std_logic_vector(7 downto 0);
  rrem:		out	std_logic_vector(7 downto 0);
  memo:		out	std_logic_vector(7 downto 0)
  );
end entity neander01;

architecture neander01 of neander01 is
  type memarray is array (0 to 31) of std_logic_vector(7 downto 0);
  type statetype is (init,fetch0,fetch1,fetch2,decod, 
					doaluop1,doaluop2,doaluop3,doaluop4,
					doaluop5load,doaluop5add,doaluop5or,doaluop5and,
					dostore1,dostore2,dostore3,dostore4,dostore5,
					dontjump,dojump1,dojump2,dojump3,doalunot);

  -- internal signals that connect architecture components
  signal mem_out: 	std_logic_vector(7 downto 0);
  signal pc_out: 	std_logic_vector(7 downto 0);
  signal ac_out: 	std_logic_vector(7 downto 0);
  signal ri_out: 	std_logic_vector(7 downto 0);
  signal rdm_out: 	std_logic_vector(7 downto 0);
  signal rem_out: 	std_logic_vector(7 downto 0);
  signal alux_in: 	std_logic_vector(7 downto 0);
  signal aluy_in: 	std_logic_vector(7 downto 0);
  signal alu_out: 	std_logic_vector(7 downto 0);
  signal alun_out: 	std_logic;
  signal aluz_out: 	std_logic;
  signal flagn_out: 	std_logic;
  signal flagz_out: 	std_logic;
  -- control signals: from FSM to datapath
  signal control_all:	std_logic_vector(12 downto 0);
  signal mem_read:	std_logic;
  signal mem_write:	std_logic;
  signal pc_inc:	std_logic;
  signal pc_load:	std_logic;
  signal ri_load:	std_logic;
  signal rdm_load:	std_logic;
  signal rem_load0:	std_logic;
  signal rem_load1:	std_logic;
  -- signals below select alu operations and load ac and flags
  signal alu_passy:	std_logic;
  signal alu_add:	std_logic;
  signal alu_or:	std_logic;
  signal alu_and:	std_logic;
  signal alu_not:	std_logic;
  -- load accumulator and flags is derived from alu operations
  signal acnz_load:	std_logic;
  -- instruction mnemonics
  constant OPNOP:	std_logic_vector(7 downto 0) := "00000000";
  constant OPSTA:	std_logic_vector(7 downto 0) := "00010000";
  constant OPLDA:	std_logic_vector(7 downto 0) := "00100000";
  constant OPADD:	std_logic_vector(7 downto 0) := "00110000";
  constant OPOR:	std_logic_vector(7 downto 0) := "01000000";
  constant OPAND:	std_logic_vector(7 downto 0) := "01010000";
  constant OPNOT:	std_logic_vector(7 downto 0) := "01100000";
  constant OPJMP:	std_logic_vector(7 downto 0) := "10000000";
  constant OPJN:	std_logic_vector(7 downto 0) := "10010000";
  constant OPJZ:	std_logic_vector(7 downto 0) := "10100000";
  constant OPHLT:	std_logic_vector(7 downto 0) := "11110000";
  -- control machine states and memory 
  signal state: statetype;
  signal address: std_logic_vector(4 downto 0);
  signal memdata: memarray;

begin
  -- lets use good names for control signals
  mem_read 	<= control_all(12);
  mem_write	<= control_all(11);
  pc_inc 	<= control_all(10);
  pc_load 	<= control_all(9);
  ri_load 	<= control_all(8);
  rdm_load 	<= control_all(7);
  rem_load0 <= control_all(6);
  rem_load1 <= control_all(5);
  alu_passy <= control_all(4);
  alu_add 	<= control_all(3);
  alu_or 	<= control_all(2);
  alu_and 	<= control_all(1);
  alu_not 	<= control_all(0);
  acnz_load <= alu_passy or alu_add or alu_or or alu_and or alu_not;
  -- simple interconnections of the datapath and outputs
  alux_in <= ac_out;
  aluy_in <= mem_out;
  pc <= pc_out;
  ri <= ri_out;
  ac <= ac_out;
  rrdm <= rdm_out;
  rrem <= rem_out;
  memo <= mem_out;

  -- FSM: the heart of the processor
  control: process(ck,reset)
  begin
    if (reset='1') then
	  state <= init;
   	elsif(rising_edge(ck)) then
      case state is
      when init => state <= fetch0;
      when fetch0 => state <= fetch1;
      when fetch1 => state <= fetch2;
      when fetch2 => state <= decod;
      when decod =>  
		  case ri_out is
			when OPNOP => state <= fetch0;
			when OPLDA => state <= doaluop1;
			when OPSTA => state <= dostore1;
			when OPADD => state <= doaluop1;
			when OPOR => state <= doaluop1;
			when OPAND => state <= doaluop1;
			when OPNOT => state <= doalunot;
			when OPJMP => state <= dojump1;
			when OPJN => if flagn_out = '1' then state <= dojump1; 
						else state <= dontjump; 
						end if;
			when OPJZ => if flagz_out = '1' then state <= dojump1; 
						else state <= dontjump; 
						end if;
			when OPHLT => state <= decod;
			when others => state <= fetch0;
		  end case;
      when doaluop1 => state <= doaluop2;
      when doaluop2 => state <= doaluop3;
      when doaluop3 => state <= doaluop4;
      when doaluop4 =>	if ri_out = OPLDA then state <= doaluop5load;
      					elsif ri_out = OPADD then state <= doaluop5add;
      					elsif ri_out = OPOR then state <= doaluop5or;
      					elsif ri_out = OPAND then state <= doaluop5and;
						end if;
      when doaluop5load => state <= fetch0;
      when doaluop5add => state <= fetch0;
      when doaluop5or => state <= fetch0;
      when doaluop5and => state <= fetch0;
      when doalunot => state <= fetch0;
      when dostore1 => state <= dostore2;
      when dostore2 => state <= dostore3;
      when dostore3 => state <= dostore4;
      when dostore4 => state <= dostore5;
      when dostore5 => state <= fetch0;
      when dojump1 => state <= dojump2;
      when dojump2 => state <= dojump3;
      when dojump3 => state <= fetch0;
      when dontjump => state <= fetch0;
      when others => state <= fetch0;
	  end case;
    end if;
  end process control;
  -- control function of the states
  with state select
  control_all <=	"0000000000000" when init,
  					"0000001000000" when fetch0,
  					"1010000000000" when fetch1,
  					"0000100000000" when fetch2,
  					"0000000000000" when decod,
  					"0000001000000" when doaluop1,
  					"1010000000000" when doaluop2,
  					"0000000100000" when doaluop3,
  					"1000000000000" when doaluop4,
  					"0000000010000" when doaluop5load,
  					"0000000001000" when doaluop5add,
  					"0000000000100" when doaluop5or,
  					"0000000000010" when doaluop5and,
  					"0000001000000" when dostore1,
  					"1010000000000" when dostore2,
  					"0000000100000" when dostore3,
  					"0000010000000" when dostore4,
  					"0100000000000" when dostore5,
  					"0010000000000" when dontjump,
  					"0000001000000" when dojump1,
  					"1010000000000" when dojump2,
  					"0001000000000" when dojump3,
  					"0000000000001" when doalunot,
  					"0000000000000" when others
					;

  with state select
  estado <=			x"00" when init,
  					x"01" when fetch0,
  					x"02" when fetch1,
  					x"03" when fetch2,
  					x"04" when decod,
  					x"05" when doaluop1,
  					x"06" when doaluop2,
  					x"07" when doaluop3,
  					x"08" when doaluop4,
  					x"09" when doaluop5load,
  					x"0a" when doaluop5add,
  					x"0b" when doaluop5or,
  					x"0c" when doaluop5and,
  					x"0d" when dostore1,
  					x"0e" when dostore2,
  					x"0f" when dostore3,
  					x"10" when dostore4,
  					x"11" when dostore5,
  					x"12" when dontjump,
  					x"13" when dojump1,
  					x"14" when dojump2,
  					x"15" when dojump3,
  					x"16" when doalunot,
  					x"17" when others
					;

-- all datapath: registers, interconnections and muxes

  datapath: process(ck,reset)
  variable pc_reg: std_logic_vector(7 downto 0);
  begin
    -- reset all registers
    if (reset='1') then
      ac_out <= "00000000";
      ri_out <= "00000000";
      pc_out <= "00000000";
      rdm_out <= "00000000";
      rem_out <= "00000000";
      flagn_out <= '0';
      flagz_out <= '0';
      pc_reg := "00000000";
    -- now the synchronized operations
    elsif (rising_edge(ck)) then
      -- accumulator
      if (acnz_load = '1') then
        ac_out <= alu_out;
        flagn_out <= alun_out;
        flagz_out <= aluz_out;  
      end if;
      -- program counter
      if (pc_load = '1') then 
        pc_reg := mem_out; 
      elsif (pc_inc = '1') then
        pc_reg := pc_reg + 1; 
      end if;
      pc_out <= pc_reg;
      -- other registers
      if (rem_load0 = '1') then rem_out <= pc_out; 
      elsif (rem_load1 = '1') then rem_out <= mem_out; end if;
      if (rdm_load = '1') then rdm_out <= ac_out; end if;
      if (ri_load = '1') then ri_out <= mem_out; end if;
   end if;
  end process datapath; 

  -- arithmetic and logic unit
  alu: process(alux_in,aluy_in,alu_passy,
			alu_add,alu_or,alu_and,alu_not)
    variable res: std_logic_vector(7 downto 0);
  begin
    if alu_passy = '1' then
      res := aluy_in;
    elsif alu_add = '1' then
      res := alux_in + aluy_in;
    elsif alu_or = '1' then
      res := alux_in or aluy_in;
    elsif alu_and = '1' then
      res := alux_in and aluy_in;
    elsif alu_not = '1' then
      res := not alux_in;
    end if;
    if res(7) = '1' then alun_out <= '1'; 
	else alun_out <= '0'; end if;
    if res = x"00" then aluz_out <= '1'; 
	else aluz_out <= '0'; end if;
    alu_out <= res;
  end process alu;

  -- the memory

  address <=	rem_out(4 downto 0);
  memory: process(ck, reset)
    variable i: integer;
  begin
    -- reset 
    if (reset='1') then
      	memdata(0) <= OPLDA;
		memdata(1) <= x"1F";
		memdata(2) <= OPSTA;
		memdata(3) <= x"1E";
		memdata(4) <= OPADD;
		memdata(5) <= x"1E";
		memdata(6) <= OPJMP;
		memdata(7) <= x"04";
		memdata(8) <= x"00";
		memdata(9) <= x"00";
		memdata(10) <= x"00";
		memdata(11) <= x"00";
		memdata(12) <= x"00";
		memdata(13) <= x"00";
		memdata(14) <= x"00";
		memdata(15) <= x"00";
		memdata(16) <= x"00";
		memdata(17) <= x"00";
		memdata(18) <= x"00";
		memdata(19) <= x"00";
		memdata(20) <= x"00";
		memdata(21) <= x"00";
		memdata(22) <= x"00";
		memdata(23) <= x"00";
		memdata(24) <= x"00";
		memdata(25) <= x"00";
		memdata(26) <= x"00";
		memdata(27) <= x"00";
		memdata(28) <= x"00";
		memdata(29) <= x"00";
		memdata(30) <= x"00";
		memdata(31) <= x"23";
    -- synchronized operations
    elsif (rising_edge(ck)) then
      -- accumulator
      if (mem_write = '1') then
		case address is
		when "00000" => memdata(0) <= rdm_out;
		when "00001" => memdata(1) <= rdm_out;
		when "00010" => memdata(2) <= rdm_out;
		when "00011" => memdata(3) <= rdm_out;
		when "00100" => memdata(4) <= rdm_out;
		when "00101" => memdata(5) <= rdm_out;
		when "00110" => memdata(6) <= rdm_out;
		when "00111" => memdata(7) <= rdm_out;
		when "01000" => memdata(8) <= rdm_out;
		when "01001" => memdata(9) <= rdm_out;
		when "01010" => memdata(10) <= rdm_out;
		when "01011" => memdata(11) <= rdm_out;
		when "01100" => memdata(12) <= rdm_out;
		when "01101" => memdata(13) <= rdm_out;
		when "01110" => memdata(14) <= rdm_out;
		when "01111" => memdata(15) <= rdm_out;
		when "10000" => memdata(16) <= rdm_out;
		when "10001" => memdata(17) <= rdm_out;
		when "10010" => memdata(18) <= rdm_out;
		when "10011" => memdata(19) <= rdm_out;
		when "10100" => memdata(20) <= rdm_out;
		when "10101" => memdata(21) <= rdm_out;
		when "10110" => memdata(22) <= rdm_out;
		when "10111" => memdata(23) <= rdm_out;
		when "11000" => memdata(24) <= rdm_out;
		when "11001" => memdata(25) <= rdm_out;
		when "11010" => memdata(26) <= rdm_out;
		when "11011" => memdata(27) <= rdm_out;
		when "11100" => memdata(28) <= rdm_out;
		when "11101" => memdata(29) <= rdm_out;
		when "11110" => memdata(30) <= rdm_out;
		when "11111" => memdata(31) <= rdm_out;
		when others => memdata(0) <= rdm_out;
        end case;
      end if;
    end if;
  end process memory; 

  mem_out <=	memdata(0) when address="00000" else
                memdata(1) when address="00001" else
                memdata(2) when address="00010" else
                memdata(3) when address="00011" else
                memdata(4) when address="00100" else
                memdata(5) when address="00101" else
                memdata(6) when address="00110" else
                memdata(7) when address="00111" else
                memdata(8) when address="01000" else
                memdata(9) when address="01001" else
                memdata(10) when address="01010" else
                memdata(11) when address="01011" else
                memdata(12) when address="01100" else
                memdata(13) when address="01101" else
                memdata(14) when address="01110" else
                memdata(15) when address="01111" else
  				memdata(16) when address="10000" else
                memdata(17) when address="10001" else
                memdata(18) when address="10010" else
                memdata(19) when address="10011" else
                memdata(20) when address="10100" else
                memdata(21) when address="10101" else
                memdata(22) when address="10110" else
                memdata(23) when address="10111" else
                memdata(24) when address="11000" else
                memdata(25) when address="11001" else
                memdata(26) when address="11010" else
                memdata(27) when address="11011" else
                memdata(28) when address="11100" else
                memdata(29) when address="11101" else
                memdata(30) when address="11110" else
                memdata(31) when address="11111" else
				memdata(0);

end architecture neander01;




