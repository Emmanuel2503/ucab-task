import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';

describe('NoteController', () => {
  let controller: NoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
    }).compile();

    controller = module.get<NoteController>(NoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

/*import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

describe('NoteController', () => {
  let controller: NoteController;
  let service: NoteService;

  // Mock del Servicio (la dependencia que faltaba)
  const mockNoteService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        {
          // AQUÍ SOLUCIONAMOS EL ERROR: Le damos el servicio falso
          provide: NoteService,
          useValue: mockNoteService,
        },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debe llamar al servicio.create', async () => {
      const dto: CreateNoteDto = { title: 'Test', content: 'Content' };
      mockNoteService.create.mockResolvedValue({ id: '1', ...dto });
      await controller.create(dto);
      expect(mockNoteService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('debe llamar al servicio.findAll con filtros', async () => {
      mockNoteService.findAll.mockResolvedValue([]);
      await controller.findAll('createdAt', 'filtro');
      expect(mockNoteService.findAll).toHaveBeenCalledWith({
        sortBy: 'createdAt',
        filter: 'filtro',
      });
    });
  });

  describe('findOne', () => {
    it('debe llamar al servicio.findOne', async () => {
      mockNoteService.findOne.mockResolvedValue({});
      await controller.findOne('1');
      expect(mockNoteService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('debe llamar al servicio.update', async () => {
      const dto: UpdateNoteDto = { title: 'New' };
      mockNoteService.update.mockResolvedValue({});
      await controller.update('1', dto);
      expect(mockNoteService.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('debe llamar al servicio.remove', async () => {
      const ids = ['1', '2'];
      mockNoteService.remove.mockResolvedValue({});
      await controller.remove(ids);
      expect(mockNoteService.remove).toHaveBeenCalledWith(ids);
    });
  });
});*/
