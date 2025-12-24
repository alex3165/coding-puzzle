f = open("input.txt", "r")
input_parsed = [list(val) for val in f.read().split("\n")]


def first(input):
    count = 0
    pos = []
    for column_index, valy in enumerate(input):
        prev_row = input[column_index - 1] if column_index > 0 else []
        next_row = input[column_index + 1] if column_index < len(input) - 1 else []

        for row_index, valx in enumerate(valy):
            if valx == ".":
                continue

            start_row_index = row_index - 1 if row_index - 1 >= 0 else 0
            end_row_index = row_index + 2 if row_index + 2 < len(valy) else len(valy)

            total = (
                prev_row[start_row_index:end_row_index]
                + valy[start_row_index:end_row_index]
                + next_row[start_row_index:end_row_index]
            )

            total_at = len([n for n in total if n == "@"])
            match = total_at < 5

            if match:
                pos.append((column_index, row_index))
                count = count + 1

    return count, pos


print(first(input_parsed))
