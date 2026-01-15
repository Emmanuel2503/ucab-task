import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';

describe('NoteService', () => {
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteService],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

/*import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';
import { NotFoundException } from '@nestjs/common';

describe('NoteService', () => {
  let service: NoteService;
  let repository;

  // Mock del repositorio (la dependencia que faltaba)
  const mockNoteRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          // AQUÍ SOLUCIONAMOS EL ERROR: Le damos el repositorio falso
          provide: 'INoteRepository',
          useValue: mockNoteRepository,
        },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
    repository = module.get('INoteRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debe retornar notas sin contenido', async () => {
      const mockNotes = [
        { id: '1', title: 'Nota 1', content: 'Contenido 1' },
        { id: '2', title: 'Nota 2', content: 'Contenido 2' },
      ];
      repository.findAll.mockResolvedValue(mockNotes);
      const result = await service.findAll({});
      expect(result).toEqual([
        { id: '1', title: 'Nota 1' },
        { id: '2', title: 'Nota 2' },
      ]);
    });
  });

  describe('findOne', () => {
    it('debe retornar la nota completa si existe', async () => {
      const mockNote = {
        id: '123',
        title: 'Nota de prueba',
        content: 'Contenido secreto',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repository.findById.mockResolvedValue(mockNote);
      const result = await service.findOne('123');
      expect(result).toEqual(mockNote);
    });

    it('debe lanzar NotFoundException si el ID no existe', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debe retornar mensaje de éxito si borra bien', async () => {
      repository.delete.mockResolvedValue(true);
      const result = await service.remove(['123']);
      expect(result).toEqual({ message: 'Notas eliminadas correctamente' });
    });
  });
});*/
