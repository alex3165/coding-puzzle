f = open("input.txt", "r")
input = [val.split(' ') for val in f.read().split('\n')]

def main(puzzle_input):
    x = 0
    y = 0

    for t in puzzle_input:
        if t[0] == 'forward':
            x += int(t[1])
        
        if t[0] == 'up':
            y += int(t[1])

        if t[0] == 'down':
            y -= int(t[1])

    
    return abs(x * y)

print(main(input))