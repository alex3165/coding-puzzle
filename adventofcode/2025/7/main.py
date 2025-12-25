def get_input():
    f = open("input.txt", "r")
    return [list(val) for val in f.read().split("\n")]


def first(input):
    count = 0
    beams_indexes = []

    for row in input:
        for column_index, val in enumerate(row):
            if val == "S":
                beams_indexes.append(column_index)

            if val == "^":
                splitting_beam_index = (
                    beams_indexes.index(column_index)
                    if column_index in beams_indexes
                    else None
                )

                if splitting_beam_index is not None:
                    left_beam = column_index - 1
                    right_beam = column_index + 1
                    beams_indexes = [
                        n
                        for idx, n in enumerate(beams_indexes)
                        if idx != splitting_beam_index
                    ]

                    if left_beam not in beams_indexes:
                        beams_indexes.append(left_beam)

                    if right_beam not in beams_indexes:
                        beams_indexes.append(right_beam)

                    count = count + 1

    return count


print(first(get_input()))
