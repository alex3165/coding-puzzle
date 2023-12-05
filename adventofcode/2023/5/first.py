def parse_map(lines):
    map_obj = []
    for line in lines[1 : len(lines)]:
        dest, src, width = line.replace("\n", "").split(" ")
        map_obj.append((int(src), int(dest), int(width)))

    return map_obj


def get_next_state(state, mapping):
    for src, dest, width in mapping:
        if state >= src and ((state - src) <= width):
            return dest + (state - src)

    return state


def main():
    # Open input file and read lines
    with open("input.txt", "r") as f:
        lines = f.readlines()
        _, series = lines[0].split(":")
        seeds = [int(seed) for seed in series.strip().split(" ")]

        mapping_table = []
        group = []
        for i, line in enumerate(lines[2 : len(lines)]):
            if line == "\n" or i == len(lines):
                mapping_table.append(parse_map(group))
                group = []
            else:
                group.append(line)

        locations = []
        for seed in seeds:
            next_state = seed
            for mapping in mapping_table:
                next_state = get_next_state(next_state, mapping)

            locations.append(next_state)

        print(min(locations))


main()
