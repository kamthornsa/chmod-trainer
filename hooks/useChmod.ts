
import { useState, useCallback, useMemo } from 'react';
import { Permissions, PermissionSet, PermissionCategory, PermissionType } from '../types';

const initialPermissions: Permissions = {
  user: { r: false, w: false, x: false },
  group: { r: false, w: false, x: false },
  other: { r: false, w: false, x: false },
};

const permissionToValue = (p: PermissionSet): number => {
  return (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
};

const valueToPermission = (v: number): PermissionSet => {
  return {
    r: (v & 4) === 4,
    w: (v & 2) === 2,
    x: (v & 1) === 1,
  };
};

const permissionToSymbolic = (p: PermissionSet): string => {
  return (p.r ? 'r' : '-') + (p.w ? 'w' : '-') + (p.x ? 'x' : '-');
};

export const useChmod = () => {
  const [permissions, setPermissions] = useState<Permissions>(initialPermissions);

  const octal = useMemo(() => {
    const user = permissionToValue(permissions.user);
    const group = permissionToValue(permissions.group);
    const other = permissionToValue(permissions.other);
    return `${user}${group}${other}`;
  }, [permissions]);

  const symbolic = useMemo(() => {
    const user = permissionToSymbolic(permissions.user);
    const group = permissionToSymbolic(permissions.group);
    const other = permissionToSymbolic(permissions.other);
    return `${user}${group}${other}`;
  }, [permissions]);

  const togglePermission = useCallback((category: PermissionCategory, type: PermissionType) => {
    setPermissions(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type],
      },
    }));
  }, []);

  const setFromOctal = useCallback((octalString: string) => {
    if (/^[0-7]{3}$/.test(octalString)) {
      const [u, g, o] = octalString.split('').map(Number);
      setPermissions({
        user: valueToPermission(u),
        group: valueToPermission(g),
        other: valueToPermission(o),
      });
    } else if (octalString === '') {
        setPermissions(initialPermissions);
    }
  }, []);

  return {
    permissions,
    octal,
    symbolic,
    togglePermission,
    setFromOctal,
  };
};
