require 'reline/unicode'

=begin

  \       |
   \      | <--- whipped cream
    \     |
     \    |
      \-~~|
       \  | <--- shibori kutigane (piping nozzle in Japanese)
        \Ml
         (\    __ __
         ( \--(  )  )
          (__(__)__)  <--- compressed whipped cream
=end

class Sibori
  attr_writer :output

  def initialize(width, height, cursor_pos)
    @width = width
    @height = height
    @cursor_pos = cursor_pos
    @screen = [String.new]
    @line_index = 0
    @byte_pointer_in_line = 0
    @cleared = false
    clone_screen
  end

  def clone_screen
    @prev_screen = @screen.map { |line|
      line.dup
    }
    @prev_cursor_pos = @cursor_pos.dup
    @prev_line_index = @line_index
  end

  def print(str)
    #$stderr.puts "print #{str.inspect}"
    line = @screen[@line_index]
    before = line.byteslice(0, @byte_pointer_in_line)
    str_width = Reline::Unicode.calculate_width(str, true)
    after_cursor = line.byteslice(@byte_pointer_in_line..-1)
    after_cursor_width = Reline::Unicode.calculate_width(after_cursor, true)
    rest = ''
    if after_cursor_width > str_width
      rest_byte_pointer = @byte_pointer_in_line + width_to_bytesize(after_cursor, str_width)
      rest = line.byteslice(rest_byte_pointer..-1)
    end
    @screen[@line_index] = before + str + rest
    @byte_pointer_in_line += str.bytesize
    @cursor_pos.x += Reline::Unicode.calculate_width(str, true)
  end

  def move_cursor_column(col)
    #$stderr.puts "move_cursor_column(#{col})"
    @byte_pointer_in_line = width_to_bytesize(@screen[@line_index], col)
    @cursor_pos.x = col
  end

  def move_cursor_up(val)
    #$stderr.puts "move_cursor_up(#{val})"
    if @line_index.positive?
      @line_index -= val
      @byte_pointer_in_line = width_to_bytesize(@screen[@line_index], @cursor_pos.x)
      @cursor_pos.y -= val
    end
  end

  def move_cursor_down(val)
    #$stderr.puts "move_cursor_down(#{val})"
    if @line_index < @height - 1
      #$stderr.puts "@line_index #{@line_index}  @screen.size #{@screen.size}  @height #{@height}"
      #$stderr.puts @screen.inspect
      @line_index += val
      @screen[@line_index] = String.new if @line_index == @screen.size
      @byte_pointer_in_line = width_to_bytesize(@screen[@line_index], @cursor_pos.x)
      @cursor_pos.y += val
    end
  end

  def scroll_down(val)
    #$stderr.puts "scroll_down(#{val})"
    if val >= @height
      clear_screen
      @line_index = @screen.size - 1
      return
    end
    @screen.size.times do |n|
      if n < @screen.size - val
        #$stderr.puts "A @screen[#{val} + #{n}] (#{@screen[val + n].inspect}) to @screen[#{n}]"
        @screen[n] = @screen[val + n]
      else
        #$stderr.puts "B String.new to @screen[#{n}]"
        @screen[n] = String.new
      end
    end
    @line_index += val
  end

  def erase_after_cursor
    #$stderr.puts "erase_after_cursor"
    @screen[@line_index] = @screen[@line_index].byteslice(0, @byte_pointer_in_line)
  end

  def clear_screen
    #$stderr.puts "clear_screen"
    @screen = [String.new]
    @line_index = 0
    @byte_pointer_in_line = 0
    @cursor_pos.x = @cursor_pos.y = 0
    @cleared = true
    Reline::IOGate.clear_screen
  end

  private def width_to_bytesize(str, width)
    lines, _ = Reline::Unicode.split_by_width(str, width)
    lines.first.bytesize
  end

  def render
    #$stderr.puts ?* * 100
    Reline::IOGate.move_cursor_up(@prev_line_index) if @prev_line_index.positive?
    #$stderr.puts "! move_cursor_up(#{@prev_line_index})" if @prev_line_index.positive?
    #$stderr.puts "@prev_line_index #{@prev_line_index}  @line_index #{@line_index}"
    if @screen.size > @prev_screen.size
    #$stderr.puts ?a * 100
      down = @screen.size - @prev_screen.size
      #$stderr.puts "#{@prev_cursor_pos.y} #{down} #{@height}"
      if @prev_cursor_pos.y + down > (@height - 1)
    #$stderr.puts ?b * 100
        scroll = (@prev_cursor_pos.y + down) - (@height - 1)
        Reline::IOGate.scroll_down(scroll)
        #$stderr.puts "! scroll_down(#{scroll})"
    #$stderr.puts "down #{down}"
        Reline::IOGate.move_cursor_up(@screen.size - 1 - scroll)
        #$stderr.puts "! move_cursor_up(#{@screen.size - 1})"
      else
    #$stderr.puts ?c * 100
      end
    end
    @screen.size.times do |n|
      Reline::IOGate.move_cursor_column(0)
      #$stderr.puts "! move_cursor_column(0)"
      @output.write @screen[n]
      #$stderr.puts "! print #{@screen[n].inspect}"
      Reline::IOGate.erase_after_cursor
      #$stderr.puts "! erase_after_cursor"
      Reline::IOGate.move_cursor_down(1) if n != (@screen.size - 1)
      #$stderr.puts "! move_cursor_down(1)" if n != (@screen.size - 1)
    end
    up = @screen.size - 1 - @line_index
    Reline::IOGate.move_cursor_up(up) if up.positive?
    #$stderr.puts "! move_cursor_up(#{up})" if up.positive?
    column = Reline::Unicode.calculate_width(@screen[@line_index].byteslice(0, @byte_pointer_in_line), true)
    Reline::IOGate.move_cursor_column(column)
    #$stderr.puts "! move_cursor_column(#{column}) #{@byte_pointer_in_line}"
    clone_screen
    #$stderr.puts ?- * 10
  end

  def prep
    Reline::IOGate.prep
  end

  def deprep
    Reline::IOGate.deprep
  end
end
