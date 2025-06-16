# Undergraduate Projects Overview

This page provides a brief introduction to various projects I conducted during my undergraduate years. Each project highlights hands-on problem solving, competition achㅈevements, experimental work, and hardware development, reflecting a wide range of experiences as an undergraduate student.

---

# 1. Image-Based Object Detection and Automated Systems

## Overview

This project focuses on utilizing deep learning to recognize real-world objects and build automated systems based on that recognition. I developed "Polavation," an AI-powered waste-sorting bin, and an object detection model for autonomous vehicles. These efforts earned the **Grand Prize at the 2022-2 VIP Competition** and the **Top Excellence Award at the 2022 INNOTHINK Make-A-Thon**.

***

## Key Features

-   **Deep Learning-Based Waste Classification**: Identifies the type of waste through image recognition.
-   **Servo Motor Control**: Uses an Arduino to automatically sort the classified waste.
-   **Real-time Object Detection**: Detects various objects such as cars and people in real-time.
-   **Model Valition**: Quantitatively evaluates model performance using the F1-Confidence Curve.

***

## Technical Details

### Architecture

![Polavation System Diagram](./projects/under_graduated/polavation.png)

1.  **Selection via AI Deep Learning**: After capturing an image, the deep learning model extracts object features (boundary, class, confidence).
2.  **Servo Motor Actuation via Arduino**: Based on the recognition results, a servo motor is driven to sort the waste.
3.  **Return**: If an item is not recyclable (e.g., a colored label on an HDPE cap), it is returned to the user.

***

## Results

### Visualization

![Object Detection Result](./projects/under_graduated/object_detection.gif)

The image above demonstrates the developed model successfully detecting cars and people in a real-world road environment. (Not enough in Micro-vehicle... LOL)

***

## Tech Stack

-   Python
-   PyTorch / YOLO
-   OpenCV
-   Arduino
-   CAD (for Hardware Design)

<br>

# 2. 0-Dimension PEMFC I-V Curve Modeling

## Overview

This is a 0-D modeling project to predict the performance of a Proton-Exchange Membrane Fuel Cell (PEMFC). It involves mathematically modeling various voltage loss mechanisms within the fuel cell to derive the final I-V characteristic curve.

***

## Key Features

-   **Voltage Loss Modeling**: Individually modeled Reversible Voltage, Activation Loss, Ohmic Loss, and Concentration Loss.
-   **Mass Transfer Analysis**: Considered the multi-component diffusion of gases within the Gas Diffusion Layer (GDL).
-   **Experimental Approach**: Secured experimental data by assembling the fuel cell and controlling variables.
-   **Flow Channel Design**: Designed a serpentine-type fuel cell flow channel.

***

## Technical Details

### Electrochemical Modeling

![PEMFC Voltage Losses](./projects/under_graduated/pemfc_losses.png)

The Net Fuel Cell Performance is calculated by subtracting various losses (Activation, Ohmic, Concentration) from the theoretical Reversible Voltage. I usually design Ohmic and Concentration behavior, and both of these are crucially related to water saturation. For instance, a membrane that is wet with water saturation decreases Ohmic loss because its ion conductivity improves. Conversely, the Gas Diffusion Layer (GDL) increases Concentration loss because saturated water obstructs species behavior, and effective diffusivity is decreased.

### Key Equations

*The following equations are the core models for calculating each voltage loss.*

**Reversible Voltage (Nernst Equation)**
$$
E = E^0 - \frac{RT}{nF} \ln \left( \frac{\prod a_{\text{products}}^{v_i}}{\prod a_{\text{reactants}}^{v_i}} \right)
$$

**Activation Loss**
$$
\Delta V_{\text{kinetic}} \approx \frac{RT}{(1-\alpha)nF} \ln\left(\frac{j}{j_0}\right)
$$

**Ohmic Loss**
$$
\Delta V_{\text{ohm}} = \text{ASR} \cdot j
$$

**Concentration Loss**
$$
\Delta V_{\text{conc}} = \frac{RT}{nF}\left(1 + \frac{1}{\alpha}\right) \ln\left(\frac{j_L}{j_L - j}\right)
$$

***

## Tech Stack

-   MATLAB / Python
-   NumPy, Matplotlib
-   CAD

<br>

# 3. Development of Custom Sensor Systems and IoT Integration

## Overview

This project involved designing and building two distinct low-cost, high-performance sensor systems: a **DIY 4-Point Probe** for measuring the electrical properties of Laser-Induced Graphene (LIG) and an **IoT Pollution Detection System** for real-time detection and separation of fluid contaminants.

***

## Key Features

-   **DIY 4-Point Probe**: A self-made 4-probe measurement device to determine the sheet resistance of LIG.
-   **PCB Design**: Designed a custom PCB with a signal amplification circuit for micro-voltage signals using KiCad.
-   **IoT-based Pollution Detection**: Detects contaminants in real-time using a turbidity sensor.
-   **Node-RED Platform**: Utilized an IoT platform to monitor sensor data and control solenoid valves for automated separation of contaminated fluid.

***

## Technical Details

### Architecture (IoT Pollution Detection System)

![IoT System Circuit](./projects/under_graduated/iot_circuit.png)
![Node-RED Flow](./projects/under_graduated/nodered_flow.png)

-   **Hardware**: An Arduino MCU reads values from the turbidity sensor and controls solenoid valves via a relay.
-   **Software**: Node-RED was used to build a dashboard for visualizing sensor data and to configure the logic for remote system control.

***

## Results

### Visualization

![Pollution Separation Demo](./projects/under_graduated/pollution_separation.gif)

The GIF above shows the developed IoT system successfully detecting and separating the contaminated orange fluid from the clean, transparent fluid.

***

## Tech Stack

-   Arduino (C++)
-   KiCad (PCB Design)
-   Node-RED
-   Fritzing
-   Various Sensors (Turbidity Sensor)