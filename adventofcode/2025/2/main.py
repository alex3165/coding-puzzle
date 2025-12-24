f = open("input.txt", "r")
input_parsed = [val.split("-") for val in f.read().split(",")]


def split_in_middle(text):
    mid = len(text) // 2
    return text[:mid], text[mid:]


def first(puzzle_input: list[list[str]]):
    errors = []
    for vals in puzzle_input:
        start = int(vals[0])
        end = int(vals[1])
        for n in range(start, end + 1):
            first, second = split_in_middle(str(n))
            if first == second:
                errors.append(n)

    print(sum(errors))


def second(puzzle_input: list[list[str]]):
    errors = []
    for vals in puzzle_input:
        start = int(vals[0])
        end = int(vals[1])
        for n in range(start, end + 1):
            seq = []
            for char in str(n):
                if len(seq) == 0:
                    seq.append(char)
                    continue

                if char == seq[0]:
                    matching_pattern = str(n).split("".join(seq))
                    if len(matching_pattern) > 2 and not any(matching_pattern):
                        errors.append(n)
                        break
                    else:
                        seq.append(char)

                else:
                    seq.append(char)

    return sum(errors)


print(second(input_parsed))
