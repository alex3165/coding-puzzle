def get_input():
    f = open("input.txt", "r")
    input_parsed = [val for val in f.read().split("\n")]
    ranges = []
    assessment = []
    for input in input_parsed:
        if "-" in input:
            ranges.append([int(n) for n in input.split("-")])

        if input.isdigit():
            assessment.append(int(input))

    return ranges, assessment


def first(input):
    ranges, assessment = input
    count = 0
    for n_eval in assessment:
        is_within = False
        for range in ranges:
            if range[0] <= n_eval and range[1] >= n_eval:
                is_within = True
                break

        if is_within:
            count = count + 1

    return count


print(first(get_input()))
