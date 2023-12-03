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


def main():
    # Open input file and read lines
    with open("input.txt", "r") as f:
        lines = f.readlines()
        n_captured = []

        for id, line in enumerate(lines):
            prev_line = lines[id - 1] if id > 0 else ""
            next_line = lines[id + 1] if id < len(lines) - 1 else ""

            state = ("", None, None)

            for i, char in enumerate(line):
                if is_dot(char) or is_symbol(char):
                    full_n = state[0]
                    min_index = state[1]
                    max_index = state[2]

                    if full_n != "":
                        min_i = min_index - 1 if min_index > 0 else 0
                        max_i = (
                            max_index + 2
                            if max_index < len(line) - 1
                            else len(line) - 1
                        )

                        prev_chain = prev_line[min_i:max_i].replace("\n", "")
                        next_chain = next_line[min_i:max_i].replace("\n", "")
                        line_chain = line[min_i:max_i].replace("\n", "")

                        if (
                            has_symbol(prev_chain)
                            or has_symbol(next_chain)
                            or has_symbol(line_chain)
                        ):
                            n_captured.append(full_n)

                    state = ("", None, None)
                    continue

                if state[0] == "":
                    state = (char, i, i)
                    continue
                else:
                    state = (state[0] + char, state[1], i)

        print(sum([int(n) for n in n_captured]))


main()
