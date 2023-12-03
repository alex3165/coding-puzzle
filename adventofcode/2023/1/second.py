dictionary = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}


def parse_int(char):
    try:
        return int(char)
    except ValueError:
        return None


def replace_letter_with_number(line):
    n = []

    for i, char in enumerate(line):
        tmp = char
        word = None

        val = parse_int(char)
        if val is not None:
            n.append(val)
            continue

        for j, next in enumerate(line):
            if i == j or j < i:
                continue

            tmp += next

            keys = list(dictionary.keys())

            if tmp in keys:
                word = tmp
                break

        if word is not None:
            n.append(dictionary[word])

    return n


def main():
    # Open input file and read lines
    with open("input.txt", "r") as f:
        lines = f.readlines()
        total = []

        for line in lines:
            n = replace_letter_with_number(line)

            total.append(int(str(n[0]) + str(n[-1])))

        print(sum(total))


main()
