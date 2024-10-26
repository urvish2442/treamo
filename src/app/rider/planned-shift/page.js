/** @format */

'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import CommonBlock from '@/components/styles/ryder.style';
import Header from '@/components/styles/ryderHeader.style';
import Select from 'react-select';
const PlanShift = () => {
  return (
    <CommonBlock>
      <Header>
        <div className='header-block'>
          <div className='header-block-left'>
            <Link href={''}>
              <img alt='' src='/back-arrrow-header.svg' />
            </Link>
            <div className='header-menu-block'>
              <span>Montag, 15.07.2024</span>
            </div>
          </div>
        </div>
      </Header>
      <div className='common-block-ryder'>
        <div className='shift-common-block'>
          <h2>Übersicht</h2>
          <div className='shift-common-block-time'>
            <p>Schichtbeginn</p>
            <span>4:02 Uhr</span>
          </div>
          <div className='shift-location'>
            <p>Musterstraße 1 11111 Musterstadt</p>
            <div className='shift-location-link'>
              <img src='/map-pin.svg' />
              <img src='/arrow-drop.svg' />
            </div>
          </div>
          <div className='info-block-last'>
            <img src='/notifiaction-block.svg' />
            <p>Für Änderungen sprich bitte direkt mit Deinem Hubmanager</p>
          </div>
        </div>
      </div>
    </CommonBlock>
  );
};

export default PlanShift;
