f = open("second.txt", "r")
input = [val.split(' ') for val in f.read().split('\n')]

def main(puzzle_input):
    x = 0
    y = 0
    aim = 0

    for t in puzzle_input:
        if t[0] == 'forward':
            x += int(t[1])
            y += abs(aim) * int(t[1])
        
        if t[0] == 'up':
            aim += int(t[1])

        if t[0] == 'down':
            aim -= int(t[1])

    
    return abs(x * y)

print(main(input))