f = open("input.txt", "r")
input = [int(val) for val in f.read().split('\n')]

def main(puzzle_input):
    res = 0

    for index, val in enumerate(puzzle_input):
        if index == 0:
            continue

        prev_val = puzzle_input[index - 1]

        if val > prev_val:
            res += 1

    return res

print(main(input))