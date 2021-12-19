f = open("input.txt", "r")
input = [val for val in f.read().split('\n')]

def main(puzzle_input):
    gamma_bin = []
    epsilon_bin = []
    for cursor in range(0, len(puzzle_input[0])):
        count_1 = 0
        count_0 = 0
        for code in puzzle_input:
            if code[cursor] == '1':
                count_1 += 1

            if code[cursor] == '0':
                count_0 += 1

        if count_1 > count_0:
            gamma_bin.append(1)
            epsilon_bin.append(0)
        else:
            gamma_bin.append(0)
            epsilon_bin.append(1)

    gamma_bin.reverse()
    epsilon_bin.reverse()
    gamma = sum([2 ** i for i, val in enumerate(gamma_bin) if val > 0])
    epsilon = sum([2 ** i for i, val in enumerate(epsilon_bin) if val > 0])
    return gamma * epsilon

print(main(input))