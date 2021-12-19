from functools import reduce


f = open("input.txt", "r")
input = [int(val) for val in f.read().split(',')]

def get_init_bucket():
    return {
        0:0,
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
    }

def sm(bucket):
    new_bucket = get_init_bucket()

    for key in bucket.keys():
        val = bucket[key]
        if key == 0:
            new_bucket[6] = new_bucket[6] + val
            new_bucket[8] = new_bucket[8] + val
        else:
            next_key = key - 1
            new_bucket[next_key] += val

    return new_bucket


def recurse_sm(state, cycle):
    return recurse_sm(sm(state), cycle - 1) if cycle != 0 else state

def main(series):
    cycles = 256
    buckets = get_init_bucket()

    for el in series:
        buckets[el] += 1

    return reduce(lambda acc, next: acc + next, recurse_sm(buckets, cycles).values(), 0)

print(main(input))
