def multiply(myList):
    result = 1
    for x in myList:
        result = result * x
    return result


def main():
    # Open input file and read lines
    with open("input.txt", "r") as f:
        lines = f.readlines()
        result = 0

        for line in lines:
            _, series = line.replace("\n", "").split(": ")

            max_inventory = {"red": 0, "green": 0, "blue": 0}

            for sub in series.split(";"):
                new = sub.split(",")
                for item in new:
                    n, color = item.strip().split(" ")
                    parsed_n = int(n)

                    if parsed_n > max_inventory[color]:
                        max_inventory[color] = parsed_n

            result += multiply(max_inventory.values())

        print(result)


main()
