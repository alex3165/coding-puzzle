def main():
    # Open input file and read lines
    with open("input.txt", "r") as f:
        lines = f.readlines()
        total = []
        for line in lines:
            n = []
            for char in line:
                try:
                    n.append(int(char))
                except ValueError:
                    continue

            total.append(int(str(n[0]) + str(n[-1])))

        print(sum(total))


main()
