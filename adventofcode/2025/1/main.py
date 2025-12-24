f = open("input.txt", "r")
input = [val for val in f.read().split("\n")]


def deduction_algorithm(position: int, distance: int, direction: str, zero_count: int):
    capped_deduction = min(position if direction == "L" else (100 - position), distance)
    left_over = distance - capped_deduction

    if direction == "L":
        new_position = position - capped_deduction
        if new_position == 0:
            new_position = 100
            if position != 0:
                zero_count = zero_count + 1

    if direction == "R":
        new_position = position + capped_deduction
        if new_position == 100:
            new_position = 0
            if position != 100:
                zero_count = zero_count + 1

    if left_over > 0:
        return deduction_algorithm(new_position, left_over, direction, zero_count)

    return (new_position, zero_count)


def first(puzzle_input: list[str]):
    position = 50
    zero_count = 0

    for input in puzzle_input:
        position, zero_count = deduction_algorithm(
            position, int(input[1:]), input[0], zero_count
        )
        print(input, position, zero_count)

    print(zero_count)


first(input)
