from functools import reduce


def get_input():
    f = open("input.txt", "r")
    input_parsed = [[n for n in val.split(" ") if n] for val in f.read().split("\n")]
    return input_parsed[0:-1], input_parsed[-1]


def first(input):
    table, operators = input
    dictionary = {}
    for row in table:
        for column_id, val in enumerate(row):
            if column_id in dictionary:
                dictionary[column_id].append(int(val))
            else:
                dictionary[column_id] = [int(val)]

    total = 0
    for id, n in dictionary.items():
        if operators[id] == "*":
            total = total + reduce(lambda x, y: x * y, n)

        if operators[id] == "+":
            total = total + sum(n)

    return total


print(first(get_input()))
