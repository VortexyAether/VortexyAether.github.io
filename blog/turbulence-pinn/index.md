# The Convergence of CFD and AI: The Rise of Physics-Informed Neural Networks (PINNs)

![Turbulence Simulation](./blog/turbulence-pinn/turbulence-pinn.png)

Published on July 21, 2025 by Jaewon Jang

For decades, Computational Fluid Dynamics (CFD) has been a cornerstone in solving fluid flow problems. However, CFD still grapples with inherent limitations such as immense computational resource demands, complex mesh generation, and difficulties in data integration. Physics-Informed Neural Networks (PINNs) are now emerging as a groundbreaking technology that is overcoming these challenges and opening new frontiers in physical simulations.

## The Powerful Advantages of PINNs: Synergy of Data and Physical Laws

Unlike conventional data-driven neural networks, PINNs directly integrate governing physical laws, such as the Navier-Stokes equations, into the neural network training process. This approach offers unique advantages that are rapidly bringing PINNs into the spotlight:

### Data Efficiency and Sparse Data Handling
Traditional deep learning models require vast amounts of data for accurate predictions. However, in many real-world scientific and engineering problems, data acquisition can be difficult or costly. PINNs leverage known physical laws, enabling them to solve flow problems more accurately and efficiently than traditional CFD solvers, even with scattered, spatio-temporal data. This allows for reliable results even in situations with limited or noisy data.

### Physical Consistency and Reliability
Purely data-driven models risk making unphysical predictions in unobserved domains. In contrast, PINNs ensure that predictions always satisfy the underlying physical laws by embedding these laws directly into the neural network's loss function. This guarantees that the model's output is physically sound and reliable.

### Mesh-Free Approach
Many traditional numerical methods like Finite Element Method (FEM) or Finite Difference Method (FDM) require the generation of computational meshes, which can be time-consuming and challenging, especially for complex geometries or high-dimensional problems. PINNs, by utilizing automatic differentiation (AD) to represent differential operators, eliminate the explicit need for mesh generation. This allows them to handle complex geometries flexibly and is advantageous for high-dimensional problems.

### Simultaneous Solution of Forward and Inverse Problems
One of PINN's most potent features is its ability to solve both forward and inverse problems within a single framework. Inverse problems, which involve inferring unknown parameters or initial/boundary conditions from limited observational data, are often prohibitively expensive and require complex, custom formulations for traditional CFD solvers.

**Example (Drag Coefficient as a Boundary Condition)**: In traditional CFD, clear physical boundary conditions like velocity or pressure are essential for simulation. However, in real-world scenarios, one might only have sparse flow data at certain points or be interested in deriving specific characteristics, such as a vehicle's drag coefficient. PINNs excel in these inverse problems. For instance, with just a few velocity measurements and information on the total drag force on an object, a PINN can infer the entire flow field and, crucially, deduce unknown physical parameters like the drag coefficient. This capability could be used to reconstruct entire flow fields from limited wind tunnel data or to optimize vehicle shapes by searching for flow conditions that yield desired drag coefficients.

## Overcoming Limitations: Recent Breakthroughs in 3D Turbulent Flow Simulation

Initially, PINNs were primarily applied to laminar or two-dimensional (2D) problems. This was due to the immense challenge posed by the complex nonlinearity, extreme sensitivity to initial conditions, and multi-scale dynamics of turbulent flows, which pushed neural network optimization to its limits.

However, recent research has demonstrated a significant breakthrough, successfully simulating high-Reynolds-number turbulent flows in both 2D and 3D using PINNs. The success of this study is attributed to the synergistic integration of several innovative methodologies:

### Physics-informed Residual Adaptive Network (PirateNet) Architecture
This architecture enables the use of deep networks while mitigating "spectral bias," allowing the capture of fine-scale turbulent structures.

### Causal Training Strategies
These strategies enforce temporal causality by prioritizing the learning of solutions at earlier times before focusing on later ones, through a modified PDE residual loss function.

### Self-Adaptive Loss Weighting
This dynamically adjusts the contributions of different loss terms to balance competing optimization objectives, thereby stabilizing training.

### Quasi-Second-Order Optimization Methods (SOAP)
Advanced optimizers like SOAP are employed to navigate complex loss landscapes and mitigate gradient conflicts inherent in turbulent systems, leading to more stable and efficient training.

### Time-Windowing with Transfer Learning
Instead of training a single PINN for the entire time domain, the temporal domain is decomposed into sequential windows. Parameters from a converged PINN model in a previous time interval are used to initialize the model for the next window, significantly improving convergence and accuracy.

By integrating these innovations, the researchers successfully obtained stable and accurate solutions for canonical turbulence benchmarks, including 2D Kolmogorov flow, the 3D Taylor-Green vortex, and 3D turbulent channel flow.

## Conclusion and Future Outlook

PINNs have proven their ability to learn continuous, mesh-free solutions directly from governing equations, opening new possibilities that transcend traditional computational limitations. While current computational efficiency may not yet surpass state-of-the-art spectral solvers, this research provides a crucial proof of concept: turbulence can be learned directly from physical laws using neural networks.

Looking ahead, PINNs are poised to contribute significantly to hybrid simulation approaches, data assimilation strategies, and scientific discovery across various fields, including fluid dynamics. Notably, the continuous and differentiable nature of PINN solutions makes them particularly well-suited for inverse problems, optimization, and control applications, areas where traditional grid-based methods face fundamental limitations. PINNs are establishing a robust foundation for physics-informed machine learning that inherently respects physical laws while tackling the formidable complexity of real-world turbulent systems, marking a significant step towards more flexible and continuous computational fluid dynamics.

## References

1. Cai, S., Mao, Z., Wang, Z., Yin, M., & Karniadakis, G. E. (2021). Physics-informed neural networks (PINNs) for fluid mechanics: A review. *Acta Mechanica Sinica*, 37(12), 1727-1738.

2. Wang, S., Sankaran, S., Stinis, P., & Perdikaris, P. (2025). Simulating Three-dimensional Turbulence with Physics-informed Neural Networks. *arXiv preprint*.
