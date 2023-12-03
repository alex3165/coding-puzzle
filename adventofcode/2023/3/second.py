def parse_int(char):
    try:
        return int(char)
    except ValueError:
        return None


def is_dot(char):
    return char == "."


def is_symbol(char):
    return not is_dot(char) and parse_int(char) is None


def has_symbol(chain):
    for char in chain:
        if is_symbol(char):
            return True

    return False


def multiply(myList):
    result = 1
    for x in myList:
        result = result * int(x)
    return result


def find_at_index(line, min_i, max_i):
    state = ("", None, None)

    valid_numbers = []
    for i, char in enumerate(line):
        if is_dot(char) or is_symbol(char):
            if (
                state[1] is not None
                and state[2] is not None
                and state[1] <= max_i
                and min_i <= state[2]
            ):
                valid_numbers.append(state[0])

            state = ("", None, None)
            continue

        if state[0] == "":
            state = (char, i, i)
        else:
            state = (state[0] + char, state[1], i)

    return valid_numbers


def get_values(gear_index, prev_line, next_line, line):
    min_i = gear_index - 1 if gear_index > 0 else 0
    max_i = gear_index + 1 if gear_index < len(line) - 1 else len(line) - 1

    prev_res = find_at_index(prev_line, min_i, max_i)
    next_res = find_at_index(next_line, min_i, max_i)
    current_res = find_at_index(line, min_i, max_i)

    final = prev_res + next_res + current_res
    if len(final) > 1:
        return multiply(final)

    return 0


def main():
    # Open input file and read lines
    with open("input.txt", "r") as f:
        lines = f.readlines()
        vals = []
        for id, line in enumerate(lines):
            prev_line = lines[id - 1] if id > 0 else ""
            next_line = lines[id + 1] if id < len(lines) - 1 else ""

            for i, char in enumerate(line):
                if char == "*":
                    vals.append(get_values(i, prev_line, next_line, line))

        print(sum(vals))


main()
