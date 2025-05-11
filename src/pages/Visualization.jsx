import React, { useState, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader, FrontSide, BackSide } from 'three';
import { Row, Col, Form, Button } from 'react-bootstrap';

const WALL_LABELS = {
  north: 'Северная стена',
  east:  'Восточная стена',
  south: 'Южная стена',
  west:  'Западная стена',
};

// Вычисление позиции объектов (окна, двери)
function computePosition(item, room) {
  const { wall, pos } = item;
  const { width, depth } = room;
  const offset = pos - ((wall === 'north' || wall === 'south') ? width / 2 : depth / 2);
  switch (wall) {
    case 'north': return [offset, item.height / 2, -depth / 2 + 0.01];
    case 'south': return [offset, item.height / 2, depth / 2 - 0.01];
    case 'west':  return [-width / 2 + 0.01, item.height / 2, offset];
    case 'east':  return [ width / 2 - 0.01, item.height / 2, offset];
    default:      return [0, 0, 0];
  }
}
// Вычисление поворота для объектов (окна, двери)
function computeRotation(wall) {
  switch (wall) {
    case 'north': return [0, 0, 0];
    case 'south': return [0, Math.PI, 0];
    case 'west':  return [0, Math.PI / 2, 0];
    case 'east':  return [0, -Math.PI / 2, 0];
    default:      return [0, 0, 0];
  }
}

// Компонент стены с обоями и краской снаружи
function Wall({ dir, room, textureUrl }) {
  const texture = useLoader(TextureLoader, textureUrl);
  const { width, depth, height } = room;
  const size = (dir === 'north' || dir === 'south') ? [width, height] : [depth, height];
  const pos = dir === 'north'
    ? [0, height / 2, -depth / 2]
    : dir === 'south'
      ? [0, height / 2, depth / 2]
      : dir === 'west'
        ? [-width / 2, height / 2, 0]
        : [width / 2, height / 2, 0];
  const rot = computeRotation(dir);
  return (
    <>
      {/* Интерьер: обои */}
      <mesh position={pos} rotation={rot}>
        <planeGeometry args={size} />
        <meshStandardMaterial map={texture} side={FrontSide} />
      </mesh>
      {/* Экстерьер: краска */}
      <mesh position={pos} rotation={rot}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="#cccccc" side={BackSide} />
      </mesh>
    </>
  );
}

export default function Visualization() {
  const [room, setRoom] = useState({ width: 5, depth: 5, height: 3 });
  const [windows, setWindows] = useState([]);
  const [doors, setDoors] = useState([]);
  const wallpaperOptions = [
    { name: 'HC31182-44pl', img: '/images/sample1.jpg' },
    { name: 'Wall123', img: '/images/sample2.jpg' },
    { name: 'Rinnegan9', img: '/images/sample3.jpg' },
  ];
  const [wallpaper, setWallpaper] = useState({
    north: wallpaperOptions[0].img,
    south: wallpaperOptions[0].img,
    west: wallpaperOptions[0].img,
    east: wallpaperOptions[0].img,
  });

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoom((r) => ({ ...r, [name]: parseFloat(value) }));
  };
  const addWindow = () => {
    setWindows((ws) => [...ws, { id: Date.now(), wall: 'north', pos: room.width / 2, width: 1, height: 1 }]);
  };
  const addDoor = () => {
    setDoors((ds) => [...ds, { id: Date.now(), wall: 'south', pos: room.width / 4, width: 1, height: 2 }]);
  };
  const updateWindow = (id, key, value) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, [key]: value } : w)));
  };
  const updateDoor = (id, key, value) => {
    setDoors((ds) => ds.map((d) => (d.id === id ? { ...d, [key]: value } : d)));
  };

  return (
    <Row>
      <Col md={4}>
        <h3>Параметры комнаты</h3>
        {['width', 'depth', 'height'].map((key) => (
          <Form.Group key={key} className="mb-2">
            <Form.Label>
              {key.charAt(0).toUpperCase() + key.slice(1)} (м)
            </Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              name={key}
              value={room[key]}
              onChange={handleRoomChange}
            />
          </Form.Group>
        ))}

        <div className="mb-3">
          <Button variant="primary" onClick={addWindow} className="me-2">
            Добавить окно
          </Button>
          <Button variant="secondary" onClick={addDoor}>Добавить дверь</Button>
        </div>

        <h4>Окна</h4>
        {windows.map((w) => (
          <div key={w.id} className="mb-3 border p-2 rounded">
            <Form.Group className="mb-1">
              <Form.Label>Стена</Form.Label>
              <Form.Select
                value={w.wall}
                onChange={(e) => updateWindow(w.id, 'wall', e.target.value)}
              >
                <option value="north">Север</option>
                <option value="south">Юг</option>
                <option value="west">Запад</option>
                <option value="east">Восток</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Ширина (м)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={w.width}
                onChange={(e) => updateWindow(w.id, 'width', parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Высота (м)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={w.height}
                onChange={(e) => updateWindow(w.id, 'height', parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Позиция от левого края (м)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={w.pos}
                onChange={(e) => updateWindow(w.id, 'pos', parseFloat(e.target.value))}
              />
            </Form.Group>
          </div>
        ))}

        <h4>Двери</h4>
        {doors.map((d) => (
          <div key={d.id} className="mb-3 border p-2 rounded">
            <Form.Group className="mb-1">
              <Form.Label>Стена</Form.Label>
              <Form.Select
                value={d.wall}
                onChange={(e) => updateDoor(d.id, 'wall', e.target.value)}
              >
                <option value="north">Север</option>
                <option value="south">Юг</option>
                <option value="west">Запад</option>
                <option value="east">Восток</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Ширина (м)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={d.width}
                onChange={(e) => updateDoor(d.id, 'width', parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Высота (м)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={d.height}
                onChange={(e) => updateDoor(d.id, 'height', parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Позиция от левого края (м)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={d.pos}
                onChange={(e) => updateDoor(d.id, 'pos', parseFloat(e.target.value))}
              />
            </Form.Group>
          </div>
        ))}

        <h3>Обои</h3>
        {['north', 'south', 'west', 'east'].map((dir) => (
          <Form.Group key={dir} className="mb-2">
            <Form.Label>{WALL_LABELS[dir]}</Form.Label>
            <Form.Select
              value={wallpaper[dir]}
              onChange={(e) => setWallpaper({ ...wallpaper, [dir]: e.target.value })}
            >
              {wallpaperOptions.map((opt) => (
                <option key={opt.img} value={opt.img}>{opt.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        ))}
      </Col>

      <Col md={8} style={{ height: '600px' }}>
        <Canvas camera={{ position: [room.width, room.depth, room.height], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} />
          <Suspense fallback={null}>
            {/* Пол */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[room.width, room.depth]} />
              <meshStandardMaterial color="#e0e0e0" />
            </mesh>
            {/* Стены */}
            {['north', 'south', 'west', 'east'].map((dir) => (
              <Wall key={dir} dir={dir} room={room} textureUrl={wallpaper[dir]} />
            ))}
            {/* Окна */}
            {windows.map((w) => (
              <mesh
                key={w.id}
                position={computePosition(w, room)}
                rotation={computeRotation(w.wall)}
              >
                <planeGeometry args={[w.width, w.height]} />
                <meshStandardMaterial color="#87ceeb" transparent opacity={0.6} />
              </mesh>
            ))}
            {/* Двери */}
            {doors.map((d) => (
              <mesh
                key={d.id}
                position={computePosition(d, room)}
                rotation={computeRotation(d.wall)}
              >
                <planeGeometry args={[d.width, d.height]} />
                <meshStandardMaterial color="#8b4513" />
              </mesh>
            ))}
          </Suspense>
          <OrbitControls />
        </Canvas>
      </Col>
    </Row>
  );
}
