from functools import reduce


f = open("input.txt", "r")
input = [[list(map(int, el.split(','))) for el in val.split(' -> ')] for val in f.read().split('\n')]

def find_next_point(first, second, i):
    if first == second:
        return first
    
    if first > second:
        return first - i

    return first + i

def get_hv_points(vectors):
    points = []

    for vector in vectors:
        [a, b] = vector
        [x1, y1] = a
        [x2, y2] = b

        xr = range(min(x2, x1), max(x2, x1) + 1)
        yr = range(min(y2, y1), max(y2, y1) + 1)

        mr = xr if len(xr) > len(yr) else yr

        for i,_ in enumerate(mr):
            next_x = find_next_point(x1, x2, i)
            next_y = find_next_point(y1, y2, i)
            points.append(str(next_x) + '|' + str(next_y))

    return points

def main(vectors):
    points = get_hv_points(vectors)

    def points_count(acc, next):
        if next in acc:
            acc[next] += 1
        else:
            acc[next] = 1

        return acc

    count_dict = reduce(points_count, points, {})
    return len([val for val in count_dict.values() if val >= 2])

print(main(input))
