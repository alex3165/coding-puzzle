inventory = {"red": 12, "green": 13, "blue": 14}


def main():
    # Open input file and read lines
    with open("input.txt", "r") as f:
        lines = f.readlines()
        result = 0

        for line in lines:
            game, series = line.replace("\n", "").split(": ")
            game_id = int(game.split(" ")[1])

            is_game_valid = True

            for sub in series.split(";"):
                new = sub.split(",")
                for item in new:
                    n, color = item.strip().split(" ")
                    parsed_n = int(n)
                    if parsed_n > inventory[color]:
                        is_game_valid = False
                        break

                if is_game_valid == False:
                    break

            if is_game_valid:
                result += game_id

        print(result)


main()
