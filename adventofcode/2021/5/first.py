from functools import reduce


f = open("input.txt", "r")
input = [[list(map(int, el.split(','))) for el in val.split(' -> ')] for val in f.read().split('\n')]

def get_hv_points(vectors):
    points = []

    for vector in vectors:
        [a, b] = vector
        [x1, y1] = a
        [x2, y2] = b
        if x1 != x2 and y1 != y2:
            continue
        else:
            xr = range(min(x2, x1), max(x2, x1) + 1)
            yr = range(min(y2, y1), max(y2, y1) + 1)

            for x in xr:
                for y in yr:
                    points.append(str(x) + '|' + str(y))
    
    return points

def main(vectors):
    points = get_hv_points(vectors)
    print(points)
    def points_count(acc, next):
        if next in acc:
            acc[next] += 1
        else:
            acc[next] = 1

        return acc

    count_dict = reduce(points_count, points, {})

    return len([val for val in count_dict.values() if val >= 2])

print(main(input))
