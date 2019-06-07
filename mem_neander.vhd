--Marcelo Johann
--UFRGS - PGMicro
--Circuitos Digitais 
--Memoria adaptada de: http://www.inf.ufrgs.br/~johann/circuitos/neander01.vhd

library ieee;
use ieee.std_logic_1164.all;

ENTITY Mem_Neander is
port(	clk: in std_logic;
		reset: in std_logic;
		mem_read: in std_logic;
		mem_write: in std_logic;
		address: in std_logic_vector(4 downto 0);
		data_in: in std_logic_vector(7 downto 0);
		data_out: out std_logic_vector(7 downto 0)
);
END Mem_Neander; 


ARCHITECTURE Behavior OF Mem_Neander IS
type memarray is array (0 to 31) of std_logic_vector(7 downto 0);
signal memdata: memarray;
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
BEGIN
memory: process(clk, reset)
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
    elsif (rising_edge(clk)) then
      -- accumulator
      if (mem_write = '1') then
		case address is
		when "00000" => memdata(0) <= data_in;
		when "00001" => memdata(1) <= data_in;
		when "00010" => memdata(2) <= data_in;
		when "00011" => memdata(3) <= data_in;
		when "00100" => memdata(4) <= data_in;
		when "00101" => memdata(5) <= data_in;
		when "00110" => memdata(6) <= data_in;
		when "00111" => memdata(7) <= data_in;
		when "01000" => memdata(8) <= data_in;
		when "01001" => memdata(9) <= data_in;
		when "01010" => memdata(10) <= data_in;
		when "01011" => memdata(11) <= data_in;
		when "01100" => memdata(12) <= data_in;
		when "01101" => memdata(13) <= data_in;
		when "01110" => memdata(14) <= data_in;
		when "01111" => memdata(15) <= data_in;
		when "10000" => memdata(16) <= data_in;
		when "10001" => memdata(17) <= data_in;
		when "10010" => memdata(18) <= data_in;
		when "10011" => memdata(19) <= data_in;
		when "10100" => memdata(20) <= data_in;
		when "10101" => memdata(21) <= data_in;
		when "10110" => memdata(22) <= data_in;
		when "10111" => memdata(23) <= data_in;
		when "11000" => memdata(24) <= data_in;
		when "11001" => memdata(25) <= data_in;
		when "11010" => memdata(26) <= data_in;
		when "11011" => memdata(27) <= data_in;
		when "11100" => memdata(28) <= data_in;
		when "11101" => memdata(29) <= data_in;
		when "11110" => memdata(30) <= data_in;
		when "11111" => memdata(31) <= data_in;
		when others => memdata(0) <= data_in;
        end case;
      end if;
    end if;
  end process memory; 

   data_out <=	memdata(0) when address="00000" else
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


End	Behavior;