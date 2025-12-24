f = open("input.txt", "r")
input_parsed = [val for val in f.read().split("\n")]


def first(multi_seq):
    res = []
    for seq in multi_seq:
        max_digit = 0
        max_matching = 0
        for char in seq:
            num = int(char)
            current_matching = int(f"{max_digit}{char}")

            if current_matching > max_matching:
                max_matching = current_matching

            if num > max_digit:
                max_digit = num
        res.append(max_matching)

    return sum(res)


def second(multi_seq):
    res = []
    for seq in multi_seq:
        result = []
        for index, char in enumerate(seq):
            seq_number = int(char)
            left_over_index = len(seq) - index
            limit_index = 12 - left_over_index
            first_part = result[0:limit_index] if limit_index > 0 else []
            remaining_to_replace = result[limit_index:] if limit_index > 0 else result
            index_slice = None

            for replace_index, value in enumerate(remaining_to_replace):
                if seq_number > value:
                    index_slice = replace_index
                    break

            if index_slice is not None:
                result = first_part + remaining_to_replace[:index_slice] + [seq_number]
                continue

            if len(result) < 12:
                result.append(seq_number)

        res.append(int("".join([str(val) for val in result])))

    return sum(res)


print(second(input_parsed))
