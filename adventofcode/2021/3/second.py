f = open("input.txt", "r")
input = [val for val in f.read().split('\n')]

def find_pattern(puzzle_input, index, is_oxygen):
    if len(puzzle_input) <= 1:
        return puzzle_input[0]

    ones = []
    zeros = []

    for input in puzzle_input:
        if input[index] == '0':
            zeros.append(input)
        if input[index] == '1':
            ones.append(input)

    if len(ones) > len(zeros):
        return find_pattern(ones if is_oxygen else zeros, index + 1, is_oxygen)

    if len(zeros) > len(ones):
        return find_pattern(zeros if is_oxygen else ones, index + 1, is_oxygen)

    if len(zeros) == len(ones):
        return find_pattern(ones if is_oxygen else zeros, index + 1, is_oxygen)


def convert_to_decimal(bin_str):
    i = len(bin_str) - 1
    sum = 0
    for val in bin_str:
        if val == '1':
            sum += 2**i

        i = i - 1

    return sum

def main(puzzle_input):
    oxygen_val = find_pattern(puzzle_input, 0, True)
    co2_val = find_pattern(puzzle_input, 0, False)

    oxygen_decimal = convert_to_decimal(oxygen_val)
    co2_decimal = convert_to_decimal(co2_val)

    return oxygen_decimal * co2_decimal

print(main(input))