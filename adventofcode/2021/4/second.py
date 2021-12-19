from functools import reduce
from itertools import chain

f = open("input.txt", "r")
series, *rest = [val for val in f.read().split('\n')]

formatted_series = list(map(int, series.split(',')))

def format_bingo(acc, next):
    if next == "":
        acc.append([])
    else:
        tmp = [int(val) for val in next.strip().split(' ') if val != ""]
        acc[-1].append(tmp)
    return acc

formatted_bingo = reduce(format_bingo, rest, [])

def rotate_matrix(m):
    return [[m[j][i] for j in range(len(m))] for i in range(len(m[0])-1,-1,-1)]

def board_has_winning_row(series, board):
    is_winning = False
    for row in board:
        is_winning = all([el in series for el in row])
        if is_winning:
            break
    
    return is_winning

def play_boards(boards, serie):
    new_boards = []
    last_winning = None

    for board in boards:
        is_winning_row = board_has_winning_row(serie, board)
        is_winning_column = board_has_winning_row(serie, rotate_matrix(board))

        if not is_winning_row and not is_winning_column:
            new_boards.append(board)
        else:
            last_winning = board

    return new_boards, last_winning

def main(series, boards):
    bingo_next = []
    last_winning = None

    for val in series:
        bingo_next.append(val)
        boards, last_winning = play_boards(boards, bingo_next)
        if len(boards) == 0:
            break

    sum_bingo = sum([el for el in list(chain.from_iterable(last_winning)) if el not in bingo_next])

    return sum_bingo * bingo_next[-1]

print(main(formatted_series, formatted_bingo))