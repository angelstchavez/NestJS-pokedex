import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1,
      })
      .select('-__v');
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      // Buscar por número de Pokemon
      pokemon = await this.pokemonModel.findOne({ no: term }).exec();
    }

    if (!pokemon) {
      if (!pokemon && isValidObjectId(term)) {
        // Buscar por ID de MongoDB
        pokemon = await this.pokemonModel.findById(term).exec();
      }
    }

    if (!pokemon) {
      // Buscar por nombre (insensible a mayúsculas/minúsculas y sin espacios en blanco)
      pokemon = await this.pokemonModel
        .findOne({ name: term.trim().toLowerCase() })
        .exec();
    }

    if (!pokemon) {
      // Si no se encuentra el Pokemon, lanzar una excepción
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" not found`,
      );
    }

    return pokemon;
  }

  async update(
    term: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    // Encuentra el Pokémon por ID, número o nombre
    const pokemon = await this.findOne(term);

    try {
      // Convierte el nombre en minúsculas si se proporciona en el DTO
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }

      // Actualiza el Pokémon y devuelve la versión actualizada
      const updatedPokemon = await this.pokemonModel
        .findByIdAndUpdate(pokemon._id, updatePokemonDto, { new: true })
        .exec();

      if (!updatedPokemon) {
        throw new BadRequestException(
          `Failed to update Pokemon with term "${term}"`,
        );
      }

      return updatedPokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();
    //const result = await this.pokemonModel.findByIdAndRemove(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pockemon with id "${id}" not found`);
    }
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exist in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs`,
    );
  }
}
