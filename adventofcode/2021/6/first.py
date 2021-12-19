f = open("input.txt", "r")
input = [int(val) for val in f.read().split(',')]

def sm(state):
    new_state = []
    for val in state:
        if val == 0:
            new_state.append(6)
            new_state.append(8)
        else:
            new_state.append(val - 1)
    
    return new_state

def recurse_sm(state, cycle):
    return recurse_sm(sm(state), cycle - 1) if cycle != 0 else state

def main(series):
    cycles = 80

    return len(recurse_sm(series, cycles))

print(main(input))
