import type { PermissionState, PluginListenerHandle } from '@capacitor/core';

export interface CaptureResult {
  /** File path for photo or video taken by camera. Example: file://your-app-dir/.../my-video.mp4 */
  filePath?: string;
  /** Error message if any */
  errorMessage?: string;
}

/**
 * Represents the result of a successful capture operation.
 */
export interface CaptureSuccessResult {
  /**
   * The MIME type of the captured media.
   * Examples: "image/jpeg", "video/mp4".
   */
  mimeType: 'image/jpeg' | 'video/mp4';

  /**
   * The name of the captured media file.
   * Examples: "my-photo.jpg", "my-video.mp4".
   */
  name: string;

  /**
   * The path to the captured media file.
   * Example: "file://path-to-my-video.mp4".
   */
  path: string;

  /**
   * The size of the captured media file in bytes.
   * Example: "7046447".
   */
  size: number;
}

/**
 * Represents the result of a failed capture operation.
 */
export interface CaptureErrorResult {
  /**
   * The error message describing the cause of the failure.
   */
  errorMessage: string;
}

export type CustomOrientation =
  | 'portraitUp'
  | 'portraitDown'
  | 'landscapeRight'
  | 'landscaperLeft';

/**
 * - `camera` permission allows to take photo and record video without audio.
 * - `microphone` permission allows to record video with audio.
 */
export interface PermissionStatus {
  camera: PermissionState;
  microphone: PermissionState;
}

export interface PreviewCameraPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  startPreview(): Promise<void>;
  stopPreview(): Promise<void>;
  takePhoto(): Promise<void>;
  capturePhoto(): Promise<void>;
  startRecord(): Promise<void>;
  stopRecord(): Promise<void>;
  flipCamera(): Promise<void>;
  getFlashModes(): Promise<any>;
  setFlashMode(): Promise<void>;
  isTorchOn(): Promise<{ result: boolean }>;
  enableTorch(options: { enable: boolean }): Promise<void>;
  isTorchAvailable(): Promise<{ result: boolean }>;
  focus(options: { x: number; y: number }): Promise<void>;
  minAvailableZoom(): Promise<{ result: number }>;
  maxAvailableZoom(): Promise<{ result: number }>;
  zoom(options: { factor: number }): Promise<void>;
  setQuality(options: { quality: 'low' | 'hq' }): Promise<void>;
  saveFileToUserDevice(options: { filePath: string }): Promise<void>;
  checkPermissions(): Promise<PermissionStatus>;
  requestPermissions(): Promise<PermissionStatus>;
  addListener(
    eventName: 'captureSuccessResult',
    listenerFunc: (data: CaptureSuccessResult) => void,
  ): Promise<PluginListenerHandle>;
  addListener(
    eventName: 'captureErrorResult',
    listenerFunc: (data: CaptureErrorResult) => void,
  ): Promise<PluginListenerHandle>;
  addListener(
    eventName: 'captureVideoFinished',
    listenerFunc: (data: CaptureResult) => void,
  ): Promise<PluginListenerHandle>;
  addListener(
    eventName: 'capturePhotoFinished',
    listenerFunc: (data: CaptureResult) => void,
  ): Promise<PluginListenerHandle>;
  addListener(
    eventName: 'accelerometerOrientation',
    listenerFunc: (data: { orientation: CustomOrientation }) => void,
  ): Promise<PluginListenerHandle>;
  removeAllListeners(): Promise<void>;
}
