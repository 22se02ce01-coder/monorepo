import { useState, useCallback, useEffect, useRef } from 'react';
import { ProcessedImageItem } from '../types/image';
import { validateImageFile, getImageDimensions } from '../utils/fileValidation';

export function useImageFiles() {
  const [images, setImages] = useState<ProcessedImageItem[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Keep track of all created object URLs to revoke them on unmount
  const createdUrlsRef = useRef<Set<string>>(new Set());

  // Clean up all object URLs when unmounting
  useEffect(() => {
    const urls = createdUrlsRef.current;
    return () => {
      urls.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {
          console.error('Error revoking URL:', e);
        }
      });
      urls.clear();
    };
  }, []);

  const addFiles = useCallback(async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setIsLoading(true);
    const errors: string[] = [];
    const newItems: ProcessedImageItem[] = [];

    for (const file of files) {
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        errors.push(validation.errorMessage || `Unsupported file: ${file.name}`);
        continue;
      }

      try {
        const { width, height, previewUrl } = await getImageDimensions(file);
        createdUrlsRef.current.add(previewUrl);

        const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        newItems.push({
          id,
          file,
          name: file.name,
          size: file.size,
          type: file.type || 'image/jpeg',
          previewUrl,
          width,
          height,
          rotation: 0,
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : `Failed to load ${file.name}`;
        errors.push(msg);
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
    }

    if (newItems.length > 0) {
      setImages((prev) => [...prev, ...newItems]);
    }

    setIsLoading(false);
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target && target.previewUrl) {
        try {
          URL.revokeObjectURL(target.previewUrl);
          createdUrlsRef.current.delete(target.previewUrl);
        } catch (e) {
          console.error(e);
        }
      }
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const clearAllImages = useCallback(() => {
    images.forEach((item) => {
      try {
        URL.revokeObjectURL(item.previewUrl);
        createdUrlsRef.current.delete(item.previewUrl);
      } catch (e) {
        console.error(e);
      }
    });
    setImages([]);
    setValidationErrors([]);
  }, [images]);

  const reorderImages = useCallback((startIndex: number, endIndex: number) => {
    setImages((prev) => {
      if (
        startIndex < 0 ||
        startIndex >= prev.length ||
        endIndex < 0 ||
        endIndex >= prev.length ||
        startIndex === endIndex
      ) {
        return prev;
      }
      const updated = [...prev];
      const [movedItem] = updated.splice(startIndex, 1);
      updated.splice(endIndex, 0, movedItem);
      return updated;
    });
  }, []);

  const rotateImage = useCallback((id: string, deltaDegrees: number = 90) => {
    setImages((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newRotation = (item.rotation + deltaDegrees) % 360;
        return {
          ...item,
          rotation: newRotation,
        };
      })
    );
  }, []);

  const sortByName = useCallback((ascending: boolean = true) => {
    setImages((prev) => {
      const sorted = [...prev].sort((a, b) => {
        return ascending
          ? a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
          : b.name.localeCompare(a.name, undefined, { numeric: true, sensitivity: 'base' });
      });
      return sorted;
    });
  }, []);

  const clearErrors = useCallback(() => {
    setValidationErrors([]);
  }, []);

  return {
    images,
    isLoading,
    validationErrors,
    addFiles,
    removeImage,
    clearAllImages,
    reorderImages,
    rotateImage,
    sortByName,
    clearErrors,
  };
}

