import {Platform} from 'react-native';
import {Toast, IToastProps} from 'native-base';

const defaultOptions: IToastProps = {
  placement: Platform.OS === 'web' ? 'top' : 'bottom',
};

class ToastService {
  static show(message: string, options: IToastProps = defaultOptions): string {
    return Toast.show({
      title: message,
      description: message,
      ...options,
    });
  }
  static success(
    message: string,
    options: IToastProps = defaultOptions,
  ): string {
    return Toast.show({
      title: 'Success',
      status: 'success',
      description: message,
      ...options,
    });
  }

  static error(message: string, options: IToastProps = defaultOptions): string {
    return Toast.show({
      title: 'Error',
      status: 'error',
      description: message,
      ...options,
    });
  }
  static warn(message: string, options: IToastProps = defaultOptions): string {
    return Toast.show({
      title: 'Warning',
      status: 'warning',
      description: message,
      ...options,
    });
  }

  static info(message: string, options: IToastProps = defaultOptions): string {
    return Toast.show({
      title: 'Info',
      status: 'info',
      description: message,
      ...options,
    });
  }

  static destroy(id: string): void {
    Toast.close(id);
  }

  static destroyAll(): void {
    Toast.closeAll();
  }
}

export default ToastService;
