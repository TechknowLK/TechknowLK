// Robo.js
import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, MathUtils } from "three";

export default function Robo(props) {
  const { nodes, materials } = useGLTF("/model/robo.gltf");
  const headRef = useRef();
  const targetRef = useRef(new Vector3(0, 6.0, 1));
  const currentLookAt = useRef(new Vector3(0, 6.0, 1));
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const { camera, size } = useThree();

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Simple and clear coordinate mapping
      const x = (event.clientX / window.innerWidth) * 2 - 1;  // Left = -1, Right = +1
      const y = (event.clientY / window.innerHeight) * 2 - 1; // Top = -1, Bottom = +1
      
      setMousePosition({ x, y });
    };

    // Add global mouse move listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (!headRef.current) return;

    // Initialize head to look more up at us on first render
    if (!isInitialized) {
      headRef.current.lookAt(0, 6.0, 1);
      setIsInitialized(true);
      return;
    }

    // Convert 2D mouse position to 3D world position with better accuracy
    // Create a target point in front of the robot head for it to look at
    
    // Simple and accurate full screen cursor tracking
    const baseY = 8.0;  // Raised the upward-looking base position for more upward tilt
    const targetX = mousePosition.x * 3.0;                    // Left (-) to Right (+) movement
    const targetY = baseY - (mousePosition.y * 4.0);         // Increased range: Top (-1) makes robot look up, Bottom (+1) makes robot look down
    const targetZ = 2.0;                                      // Slightly further for better tracking
    
    // Set target position
    targetRef.current.set(targetX, targetY, targetZ);
    
    // Balanced interpolation for smooth and accurate tracking
    currentLookAt.current.lerp(targetRef.current, 0.2);
    
    // Make the head look at the interpolated target
    headRef.current.lookAt(currentLookAt.current);
  });

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.16, 0.012]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Head + everything attached */}
        <group ref={headRef} position={[0, -0.001, 0.094]}>
          <mesh geometry={nodes.Head_Head_0.geometry} material={materials.Head} />
          <mesh geometry={nodes.Head_EyeBorder_0.geometry} material={materials.EyeBorder} />
          <mesh geometry={nodes.Head_Ears_0.geometry} material={materials.Ears} />
          <mesh geometry={nodes.Head_Eyes_0.geometry} material={materials.Eyes} />
          <mesh geometry={nodes.Antenna_Antenna_0.geometry} material={materials.Antenna} />
          <mesh geometry={nodes.Antenna_Holder_0.geometry} material={materials.Holder} />
          <mesh geometry={nodes.Antenna_light_0.geometry} material={materials.light} />
        </group>
      </group>

      {/* Arms */}
      <group position={[-0.054, 0.145, -0.002]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.LeftArm_HandCircleMat_0.geometry} material={materials.HandCircleMat} />
        <mesh geometry={nodes.LeftArm_AfterCircleMat_0.geometry} material={materials.AfterCircleMat} />
        <mesh geometry={nodes.LeftArm_ForeArmMat_0.geometry} material={materials.ForeArmMat} />
        <mesh geometry={nodes.LeftArm_FingersMAt_0.geometry} material={materials.FingersMAt} />
        <mesh geometry={nodes.LeftArm_HandMad_0.geometry} material={materials.HandMad} />
      </group>

      <group position={[0.054, 0.145, -0.002]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.RightArm_HandCircleMat_0.geometry} material={materials.HandCircleMat} />
        <mesh geometry={nodes.RightArm_AfterCircleMat_0.geometry} material={materials.AfterCircleMat} />
        <mesh geometry={nodes.RightArm_ForeArmMat_0.geometry} material={materials.ForeArmMat} />
        <mesh geometry={nodes.RightArm_FingersMAt_0.geometry} material={materials.FingersMAt} />
        <mesh geometry={nodes.RightArm_HandMad_0.geometry} material={materials.HandMad} />
      </group>

      {/* Wheels */}
      <group position={[-0.049, 0.047, -0.003]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.RightWheel_Wheelmat_0.geometry} material={materials.Wheelmat} />
        <mesh geometry={nodes.RightWheel_wheelHolderMAt_0.geometry} material={materials.wheelHolderMAt} />
      </group>

      <group position={[0.049, 0.047, -0.003]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.LeftWheel_Wheelmat_0.geometry} material={materials.Wheelmat} />
        <mesh geometry={nodes.LeftWheel_wheelHolderMAt_0.geometry} material={materials.wheelHolderMAt} />
      </group>

      {/* Chest, Hips, Neck, Spine */}
      <mesh geometry={nodes.Chest_chestMat_0.geometry} material={materials.chestMat} position={[0, 0.135, 0.006]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Hips_hipsMat_0.geometry} material={materials.hipsMat} position={[0, 0.065, 0.009]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Neck_Neck_0.geometry} material={materials.Neck} position={[0.001, 0.174, 0.006]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.MidSpine_midSpineMat_0.geometry} material={materials.midSpineMat} position={[0, 0.096, 0.01]} rotation={[-Math.PI / 2, 0, 0]} scale={1.053} />
    </group>
  );
}

useGLTF.preload("/model/robo.gltf");