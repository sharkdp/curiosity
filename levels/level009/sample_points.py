from random import seed, uniform

seed(1)

for _ in range(1000):
    x = uniform(-1, 1)
    y = uniform(-1, 1)
    z = uniform(-1, 1)

    if x ** 2 + y ** 2 <= 1:
        print(x, y, z)
