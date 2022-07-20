require "serialport"
require "uri"
require "net/http"

lat = 36.12496349011065
lng = 136.2212399754632

loop do
  uri = URI("http://localhost:4567/send_coordinate/#{lat},#{lng}")
  res = Net::HTTP.get_response(uri)
  puts res.code
  sleep(1)
  lat += 0.0001
  lng += 0.0001
end
