# Timeline Components

Esta carpeta contiene los componentes reutilizables para la aplicación de timeline.

## Estructura

```
src/components/
├── atoms/              # Componentes básicos
│   ├── Button/
│   │   ├── ZoomButton.tsx
│   │   ├── EditButton.tsx
│   │   └── *.stories.tsx
│   ├── Icon/
│   │   ├── GripIcon.tsx
│   │   └── *.stories.tsx
│   ├── Input/
│   │   ├── InlineInput.tsx
│   │   └── *.stories.tsx
│   └── Text/
│       ├── EventName.tsx
│       ├── DateLabel.tsx
│       └── *.stories.tsx
└── index.ts            # Exportaciones principales
```

## Componentes Disponibles

### Buttons
- **ZoomButton**: Botón para controles de zoom (zoom in/out)
- **EditButton**: Botón de edición que aparece en hover

### Icons
- **GripIcon**: Ícono de agarre para elementos arrastrables

### Inputs
- **InlineInput**: Input para edición inline de nombres de eventos

### Text
- **EventName**: Componente de texto para nombres de eventos
- **DateLabel**: Etiqueta de fecha para el timeline

## Uso

```tsx
import { ZoomButton, EditButton, EventName } from '@/components';
import { ZoomIn, ZoomOut } from 'lucide-react';

// Botón de zoom
<ZoomButton 
  icon={ZoomIn} 
  onClick={handleZoomIn} 
  title="Zoom in" 
/>

// Botón de edición
<EditButton onClick={handleEdit} />

// Nombre de evento
<EventName name="Project Kickoff" />
```

## Storybook

Todos los componentes tienen historias en Storybook disponibles en:
- Desarrollo: `npm run storybook`
- Producción: `/storybook` en el deployment

## Testing

Los componentes incluyen tests unitarios:
```bash
npm run test        # Modo watch
npm run test:run    # Una vez
```

## Características

- ✅ TypeScript con tipos estrictos
- ✅ Tailwind CSS para estilos
- ✅ Lucide React para iconos
- ✅ Storybook para documentación
- ✅ Tests con Vitest
- ✅ Accesibilidad (ARIA labels, etc.)
- ✅ Responsive design
- ✅ Hover states y transiciones