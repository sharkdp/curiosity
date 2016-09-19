from random import seed, uniform
import math

# CONSTANTS
RADIUS = 10
INNER_RADIUS = 3
PI = math.pi

# INITIALIZE
seed(1)

# MAIN
for _ in range(5000):
    r_outer = RADIUS
    r_inner = INNER_RADIUS
    theta_outer = uniform(-2 * PI, 2 * PI)
    theta_inner = uniform(-2 * PI, 2 * PI)

    x = math.cos(theta_outer) * (r_outer + math.cos(theta_inner) * r_inner)
    y = math.sin(theta_outer) * (r_outer + math.cos(theta_inner) * r_inner)
    z = math.sin(theta_inner) * r_inner

    print("{}, {}, {}".format(x, y, z))
