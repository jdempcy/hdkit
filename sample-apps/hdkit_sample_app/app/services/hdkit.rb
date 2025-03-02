# # # # # # # # # # # # # # # # # # #
# * * * * * * * * * * * * * * * * * #
# * * * * *  H D   K I T  * * * * * #
# * * * * * * * * * * * * * * * * * #
# * The Open-Source, Human Design * #
# * *  Web Programming Toolkit  * * #
# * * * * * * * * * * * * * * * * * #
# * * *  Est. November, 2016  * * * #
# * * * * * * * * * * * * * * * * * #
# # # # # # # # # # # # # # # # # # #

GATES = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8,
  20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47, 6,
  46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60
].freeze

class Hdkit
  def generate_activations(celestial_positions)

    
    sun_activation = activation(celestial_positions[Swe4r::SE_SUN][0])
    north_node_activation = activation(celestial_positions[Swe4r::SE_TRUE_NODE][0])
    moon_activation = activation(celestial_positions[Swe4r::SE_MOON][0])
    mercury_activation = activation(celestial_positions[Swe4r::SE_MERCURY][0])
    venus_activation = activation(celestial_positions[Swe4r::SE_VENUS][0])
    mars_activation = activation(celestial_positions[Swe4r::SE_MARS][0])
    jupiter_activation = activation(celestial_positions[Swe4r::SE_JUPITER][0])
    saturn_activation = activation(celestial_positions[Swe4r::SE_SATURN][0])
    uranus_activation = activation(celestial_positions[Swe4r::SE_URANUS][0])
    neptune_activation = activation(celestial_positions[Swe4r::SE_NEPTUNE][0])
    pluto_activation = activation(celestial_positions[Swe4r::SE_PLUTO][0])

    {
      sun_gate: sun_activation[:gate],
      sun_line: sun_activation[:line],
      earth_gate: opposite_gate(sun_activation[:gate]),
      north_node_gate: north_node_activation[:gate],
      north_node_line: north_node_activation[:line],
      south_node_gate: opposite_gate(north_node_activation[:gate]),
      moon_gate: moon_activation[:gate],
      moon_line: moon_activation[:line],
      moon_color: moon_activation[:color],
      mercury_gate: mercury_activation[:gate],
      mercury_line: mercury_activation[:line],
      mercury_color: mercury_activation[:color],
      venus_gate: venus_activation[:gate],
      venus_line: venus_activation[:line],
      venus_color: venus_activation[:color],
      mars_gate: mars_activation[:gate],
      mars_line: mars_activation[:line],
      mars_color: mars_activation[:color],
      jupiter_gate: jupiter_activation[:gate],
      jupiter_line: jupiter_activation[:line],
      jupiter_color: jupiter_activation[:color],
      saturn_gate: saturn_activation[:gate],
      saturn_line: saturn_activation[:line],
      saturn_color: saturn_activation[:color],
      uranus_gate: uranus_activation[:gate],
      uranus_line: uranus_activation[:line],
      uranus_color: uranus_activation[:color],
      neptune_gate: neptune_activation[:gate],
      neptune_line: neptune_activation[:line],
      neptune_color: neptune_activation[:color],
      pluto_gate: pluto_activation[:gate],
      pluto_line: pluto_activation[:line],
      pluto_color: pluto_activation[:color]
    }
  end

  private

  def activation(celestial_position)
    # Human Design gates start at Gate 41 at 02º00'00" Aquarius,
    # so we have to adjust from 00º00'00" Aries.
    # The distance is 58º00'00" exactly.
    celestial_position += 58
    celestial_position -= 360 if celestial_position > 360

    percentage_through = celestial_position / 360.0 # e.g. 182.3705 becomes 0.5065

    # Gate
    gate = GATES[(percentage_through * 64).to_i]

    # Line
    exact_line = 384 * percentage_through
    line = (exact_line % 6) + 1

    # Color
    exact_color = 2304 * percentage_through
    color = (exact_color % 6) + 1

    # # Tone
    # exact_tone = 13_824 * percentage_through
    # tone = (exact_tone % 6) + 1

    # # Base
    # exact_base = 69_120 * percentage_through # e.g. 46151
    # base = (exact_base % 5) + 1

    {
      gate:,
      line:,
      color:
    }
  end

  def opposite_gate(gate)
    # Find the index of the input gate in the Gates array
    index = GATES.index(gate)

    # Calculate the opposite gate index, taking into account the array length
    opposite_index = (index + 32) % GATES.length

    # Return the opposite gate
    GATES[opposite_index]
  end
end