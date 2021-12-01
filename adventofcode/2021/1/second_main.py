f = open("input.txt", "r")
input = [int(val) for val in f.read().split('\n')]

def main(puzzle_input):
    res = 0

    bucket_val = None

    for index, val in enumerate(puzzle_input):
        if index < 2:
            continue
        
        first = puzzle_input[index - 2]
        second = puzzle_input[index - 1]

        current_n = sum([val, first, second])

        if bucket_val and current_n > bucket_val:
            res += 1
        
        bucket_val = current_n


    return res

print(main(input))