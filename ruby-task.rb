require 'httparty'
require 'json'

def fetch_data(url)
  response = HTTParty.get(url)
  JSON.parse(response.body)
end

def random_id(max_id)
  rand(1..max_id)
end

def fetch_random_resource(resource_type, max_id)
  resource_id = random_id(max_id)
  resource_url = "https://swapi.py4e.com/api/#{resource_type}/#{resource_id}/"
  fetch_data(resource_url)
end

def format_character(character)
  gender = character['gender']
  honourific = gender == 'female' ? 'Ms.' : 'Mr.'
  surname = character['name'].split(' ').last
  "#{honourific} #{surname}"
end

def format_starship(starship)
  "their #{starship['name']}"
end

def generate_sentence
  max_character_id = 15
  max_starship_id = 30

  character1 = fetch_random_resource('people', max_character_id)
  character2 = fetch_random_resource('people', max_character_id)
  starship = fetch_random_resource('starships', max_starship_id)

  "#{format_character(character1)} and #{format_character(character2)} cruising around in #{format_starship(starship)}"
end

puts generate_sentence