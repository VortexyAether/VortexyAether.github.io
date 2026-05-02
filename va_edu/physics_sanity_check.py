import math

G = 9.81
RHO_WATER = 1000
MU_WATER = 1.005e-3

def pipe_friction_factor(Re, roughness):
    def sj(Re):
        return 0.25 / math.log10(roughness / 3.7 + 5.74 / (Re ** 0.9)) ** 2
    if Re < 2300:
        return 64 / max(Re, 1)
    if Re > 4000:
        return sj(Re)
    t = (Re - 2300) / 1700
    return (64 / 2300) * (1 - t) + sj(4000) * t

# Hydrostatic same-fluid piezometer head should equal h regardless of density.
for rho in [700, 1000, 1300]:
    h = 3.4
    p = rho * G * h
    assert abs(p / (rho * G) - h) < 1e-12

# Couette and plane Poiseuille wall shear consistency.
mu, Umax, H = 1.0e-3, 1.2, 0.010
assert abs(mu * Umax / H - 0.12) < 1e-12
assert abs(4 * mu * Umax / H - 0.48) < 1e-12

# Hydraulic jump only valid for Fr > 1; known example y1=.08,V=3 => y2 about .349 m.
y1, V1 = 0.08, 3.0
Fr = V1 / math.sqrt(G * y1)
ratio = 0.5 * (math.sqrt(1 + 8 * Fr * Fr) - 1)
y2 = y1 * ratio
loss = (y2 - y1) ** 3 / (4 * y1 * y2)
assert Fr > 1
assert 0.34 < y2 < 0.36
assert 0.16 < loss < 0.18

# Pipe default rough turbulent case should be sane.
D, V, L, rough = 0.02, 1.0, 5.0, 0.001
Re = RHO_WATER * V * D / MU_WATER
f = pipe_friction_factor(Re, rough)
dp = f * (L / D) * RHO_WATER * V * V / 2
assert 19000 < Re < 21000
assert 0.02 < f < 0.04
assert 2500 < dp < 5000

# External drag default: 0.5*1.225*15^2*.08*.04 = 0.441 N.
Fd = 0.5 * 1.225 * 15**2 * 0.08 * 0.04
assert abs(Fd - 0.441) < 1e-9

print('physics sanity checks passed')
