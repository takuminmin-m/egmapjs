require "sinatra"
require "sinatra-websocket"

set :sockets, []

lat = 36.12496349011065
lng = 136.2212399754632

get "/get_coordinate" do
  if request.websocket?
    request.websocket do |ws|
      ws.onopen do
        settings.sockets << ws
      end

      ws.onclose do
        settings.sockets.delete(ws)
        puts "websocket connection closed."
      end
    end
  end
end

get "/send_coordinate/:lat,:lng" do
  lat = params['lat'].to_f
  lng = params['lng'].to_f

  settings.sockets.each do |s|
    s.send("#{lat},#{lng}")
  end

  200
end
