def main():
    # Open input file and read lines
    with open("input.txt", "r") as f:
        lines = f.readlines()
        total = 0
        next_scores_table = {}

        for line in lines:
            game, series = line.split(":")
            game_id = int(game.replace("Card", "").strip())
            winning_series, game_series = series.split("|")

            winning_series = [
                int(n) for n in winning_series.strip().split(" ") if n != ""
            ]
            game_series = [int(n) for n in game_series.strip().split(" ") if n != ""]

            score_index = 1
            current_score_value = (
                next_scores_table[game_id] + 1 if game_id in next_scores_table else 1
            )

            for n in game_series:
                if n in winning_series:
                    calc_id = game_id + score_index
                    if calc_id in next_scores_table:
                        next_scores_table[calc_id] = next_scores_table[calc_id] + (
                            1 * current_score_value
                        )
                    else:
                        next_scores_table[calc_id] = 1 * current_score_value

                    score_index += 1

            total += current_score_value

        print(total, next_scores_table)


main()
