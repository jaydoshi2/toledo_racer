# Toledo Racer - DeepFlyer Frontend

A Next.js-based frontend application for the **DeepFlyer** reinforcement learning platform, inspired by AWS DeepRacer but designed specifically for autonomous drone training and control.

## 🚁 Overview

**DeepFlyer** is an innovative reinforcement learning platform that enables users to train autonomous drones using advanced AI algorithms. The system combines control theory (PID) with real-time feedback to teach drones how to navigate virtual 3D spaces efficiently.

### Key Features

- **Interactive Learning Experience**: Step-by-step guided learning about drone components and reinforcement learning concepts
- **Model Creation Wizard**: Multi-step process for creating and configuring drone training models
- **Real-time Code Editor**: Monaco-based Python code editor with syntax highlighting and validation
- **Live Training Visualization**: Real-time charts showing training progress and metrics
- **WebSocket Integration**: Real-time communication with backend for drone control and training updates
- **User Authentication**: Simple username-based authentication system
- **Model Management**: View, manage, and track your trained models

## 🏗️ Architecture

### Frontend Stack
- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom UI components
- **State Management**: React hooks and localStorage
- **Code Editor**: Monaco Editor with Python syntax support
- **Charts**: Chart.js and Recharts for data visualization
- **WebSocket**: Socket.io-client for real-time communication

### Key Components

#### Core Pages
- **Homepage** (`/`): Landing page with project overview and navigation
- **Learning Module** (`/take_a_look_1`): Interactive drone component learning
- **Authentication** (`/username`): User login/signup with flip card animation
- **Model Creation** (`/create_model/step*`): Multi-step wizard for model configuration
- **Model Management** (`/your_models`): Dashboard for viewing and managing models
- **Training Visualization** (`/model_page`): Real-time training progress charts
- **Backend Testing** (`/backend_testing`): WebSocket-based drone control panel

#### Model Creation Steps
1. **Step 1**: Model naming and environment selection (track configuration)
2. **Step 2**: Drone configuration (algorithm, hyperparameters, wind settings)
3. **Step 3**: Vehicle selection (Holybro X500 drone shell)
4. **Step 4**: Reward function customization with Python code editor

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend server running (see backend repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone <frontend-repo-url>
   cd toledo_racer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Configuration

The frontend connects to the backend API at `http://localhost:8000`. Ensure your backend server is running before using the application.

## 🔧 Development

### Project Structure
```
toledo_racer/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (code compilation)
│   ├── create_model/      # Model creation wizard
│   ├── your_models/       # Model management
│   └── ...               # Other pages
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   ├── CodeEditor.tsx    # Monaco-based code editor
│   └── pythonValidator.tsx
├── lib/                  # Utility functions
├── public/               # Static assets
└── ...
```

### Key Features Implementation

#### Code Editor
- Monaco Editor integration with Python syntax highlighting
- Real-time code validation using external compilation API
- Error highlighting and line-specific feedback

#### WebSocket Integration
- Real-time training progress updates
- Live drone control commands
- Connection status monitoring

#### Model Creation Flow
- Multi-step wizard with data persistence
- Form validation and error handling
- Local storage for step data

## 🔗 Backend Integration

This frontend application is designed to work with a Python FastAPI backend that provides:

- **User Management**: User authentication and model storage
- **Model Training**: Reinforcement learning model training with PPO/SAC algorithms
- **Drone Control**: WebSocket-based real-time drone control
- **Simulation**: Gazebo-based drone simulation environment

**Backend Repository**: [Link to backend repository](https://github.com/your-username/toledo-racer-backend)

### API Endpoints Used
- `GET /users/{username}` - User authentication
- `POST /users/` - User registration
- `GET /users/{username}/drone-models/` - Fetch user models
- `POST /users/{username}/drone-models/` - Create new model
- `WS /ws/control` - Drone control WebSocket
- `WS /ws/train` - Training progress WebSocket

## 🎯 Learning Features

### Drone Component Education
The application includes an interactive learning module covering:
- **Drone Frame**: Structural foundation and design considerations
- **Propellers**: Thrust generation and directional control
- **Flight Controller**: Central processing and sensor data interpretation
- **ESCs**: Motor speed control and power conversion
- **Brushless Motors**: Efficient rotational motion generation
- **GPS Module**: Position tracking and navigation
- **LiPo Battery**: Power management and flight time

### Reinforcement Learning Concepts
- **Agent-Environment Interaction**: How drones learn from their environment
- **Reward Functions**: Customizable reward mechanisms for training
- **Policy Optimization**: PPO and SAC algorithms for model training
- **PID Control**: Proportional control for stable flight

## 🚁 Supported Hardware

The system is designed to work with:
- **Holybro X500**: Primary drone platform
- **PX4 Flight Controller**: Onboard communication and control
- **Gazebo Simulation**: Virtual training environment

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by AWS DeepRacer platform
- Built with Next.js and modern web technologies
- Uses Monaco Editor for code editing experience
- Integrates with FastAPI backend for robust API communication

---

**Note**: This frontend application requires the corresponding backend server to be running for full functionality. Please refer to the backend repository for setup instructions.
