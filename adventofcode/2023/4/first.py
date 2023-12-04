def main():
    # Open input file and read lines
    with open("input.txt", "r") as f:
        lines = f.readlines()
        total = 0
        for line in lines:
            game, series = line.split(":")
            game_id = int(game.replace("Card", "").strip())
            winning_series, game_series = series.split("|")

            winning_series = [
                int(n) for n in winning_series.strip().split(" ") if n != ""
            ]
            game_series = [int(n) for n in game_series.strip().split(" ") if n != ""]

            score = 0
            for i, n in enumerate(game_series):
                if n in winning_series:
                    if score == 0:
                        score = 1
                    else:
                        score = score * 2

            total += score

        print(total)


main()
