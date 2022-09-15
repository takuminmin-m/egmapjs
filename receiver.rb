require "serialport"
require "uri"
require "net/http"

lat = 36.12496349011065
lng = 136.2212399754632

sp = SerialPort.new("/dev/ttyUSB0", 9600)

line = ""
loop do
  chars = sp.gets
  line += chars if chars
  if line&.index("\r")
    begin
      uri = URI("http://localhost:4567/send_coordinate/#{line.chomp}")
      res = Net::HTTP.get_response(uri)
    end
    p line
    line = ""
  end
  # sleep(1)

  # puts res.code
  # sleep(1)
  # lat += 0.0001
  # lng += 0.0001
end
