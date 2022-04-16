/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Stack } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiCalendarEventLine,
} from 'react-icons/ri';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="AGENDAMENTO">
        <NavLink icon={RiContactsLine} href="/">
          Criar
        </NavLink>
        <NavLink icon={RiCalendarEventLine} href="/schedules">
          Consultar
        </NavLink>
      </NavSection>
    </Stack>
  );
}
